# Library load
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from ast import literal_eval
import pandas as pd
import numpy as np
import warnings
from flask import Flask, request
from flask_cors import CORS
import pymysql
import random

app = Flask(__name__)
CORS(app)

warnings.filterwarnings('ignore')


f_conn = open("./env.txt")

DB_HOST = f_conn.readline().strip()
DB_USER = f_conn.readline().strip()
DB_DATABASE_NAME = f_conn.readline().strip()
DB_PASSWORD = f_conn.readline().strip()
DB_CHARSET = "utf8mb4"
f_conn.close()


def getData():
    conn = pymysql.connect(host=DB_HOST, user=DB_USER,
                           password=DB_PASSWORD, db=DB_DATABASE_NAME, charset='utf8')
    query = ' select v.id, v.title, v.producer, v.gender, v.play_count, c.name as genre, v.thumbnail from category c inner join video_category vc on c.id = vc.category_id inner join video v on v.id = vc.video_id order by v.id '
    oldDf = pd.read_sql_query(query, conn)

    pd.set_option('max_colwidth', 100)

    newDf = pd.DataFrame(columns=[
                         'id', 'title', 'production', 'gender', 'playCount', 'genres', 'thumbnail'])

    temp = -1
    tmpStr = ""
    for index, row in oldDf.iterrows():
        if (row.id != temp):
            # print(tmpStr)

            gender = ""
            if (row.gender == 1):
                gender = "Female"
            else:
                gender = "Male"

            newDf = newDf._append(pd.DataFrame([[row.id, row.title, row.producer, gender, row.play_count, tmpStr.rstrip(
            ), row.thumbnail]], columns=['id', 'title', 'production', 'gender', 'playCount', 'genres', 'thumbnail']))
            tmpStr = ""
            temp = row.id

        tmpStr += (row.genre+' ')

    return newDf


movies_df = getData()


def getSimilarity():
    movies_df = getData()
    count_vect = CountVectorizer(min_df=0, ngram_range=(1, 2))
    genre_mat = count_vect.fit_transform(movies_df['genres'])

    director_vect = CountVectorizer().fit_transform(movies_df['production'])
    gender_vect = CountVectorizer().fit_transform(movies_df['gender'])

    # 랜덤한 숫자 뽑기
    randomWeight = [[0.3, 0.6, 0.1], [0.2, 0.7, 0.1], [0.4, 0.5, 0.1]]
    randomNum = random.randrange(0, 3)

    genre_sim = cosine_similarity(director_vect, director_vect) * randomWeight[randomNum][0] + cosine_similarity(
        genre_mat, genre_mat) * randomWeight[randomNum][1] + cosine_similarity(gender_vect, gender_vect) * randomWeight[randomNum][2]

    # [:, ::-1] axis = 1 기준으로 2차원 numpy 배열 뒤집기
    genre_sim_sorted_ind = genre_sim.argsort()[:, ::-1]

    return genre_sim_sorted_ind


def find_sim_movie(df, sorted_ind, title_name, top_n=10):
    title_movie = df[df['title'] == title_name]
    title_index = title_movie.index.values

    # top_n의 2배에 해당하는 장르 유사성이 높은 인덱스 추출
    similar_indexes = sorted_ind[title_index, :(top_n*2)]

    # reshape(-1) 1차열 배열 반환
    similar_indexes = similar_indexes.reshape(-1)

    # 기준 영화 인덱스는 제외
    similar_indexes = similar_indexes[similar_indexes != title_index]

    # top_n의 2배에 해당하는 후보군에서 weighted_vote가 높은 순으로 top_n만큼 추출
    return df.iloc[similar_indexes][:top_n]


# 회원 조회해서 회원의 더빙 영상이 있는지 체크 => 가장 최근에 더빙한 영상으로 뽑아줌
def getCheckDub(userId):
    db = pymysql.connect(host=DB_HOST, user=DB_USER,
                         password=DB_PASSWORD, db=DB_DATABASE_NAME, charset='utf8')
    curs = db.cursor()
    # 회원에 해당하는 가장 최근에 더빙한 영상
    sql = "select video_id from record where is_active=true and user_id =%s order by created_date desc limit 1"
    curs.execute(sql, [userId])
    rows = curs.fetchall()
    temp = []
    for r in rows:
        temp.append(r[0])
    print(temp)
    db.commit()
    db.close()
    return temp


# 더빙영상이 없을때, 회원이 원하는 장르 찾기
def getCategory(userId):
    db = pymysql.connect(host=DB_HOST, user=DB_USER,
                         password=DB_PASSWORD, db=DB_DATABASE_NAME, charset='utf8')
    curs = db.cursor()
    sql = "select uc.category_id from user_category uc join category c on c.id = uc.category_id where user_id = %s"
    curs.execute(sql, [userId])
    rows = curs.fetchall()
    temp = []
    for e in rows:
        temp.append(e[0])
    db.commit()
    db.close()
    return temp


# 더빙 영상이 있을때 어떤 비디오인지 찾기
def getDubRecord(videoId):
    db = pymysql.connect(host=DB_HOST, user=DB_USER,
                         password=DB_PASSWORD, db=DB_DATABASE_NAME, charset='utf8')
    curs = db.cursor()
    sql = "select title from video where id = %s"
    curs.execute(sql, [videoId])
    rows = curs.fetchall()
    temp = []
    for r in rows:
        temp.append(r[0])

    db.commit()
    db.close()
    return temp


# 회원이 더빙한 영상에 장르 뽑기
def getVideoFindByCategory(categoryId):
    db = pymysql.connect(host=DB_HOST, user=DB_USER,
                         password=DB_PASSWORD, db=DB_DATABASE_NAME, charset='utf8')
    curs = db.cursor()
    sql = "select v.title from video_category vc join video v on v.id = vc.video_id  where category_id = %s"
    curs.execute(sql, [categoryId])
    rows = curs.fetchall()
    temp = []
    for e in rows:
        temp.append(e[0])

    db.commit()
    db.close()
    return temp


# 추천 API
@app.route('/recommend/contents', methods=['GET'])
def dublistAPI():
    userId = request.get_json()["userId"]
    # 회원 조회해서 회원의 더빙 영상이 있는지 체크
    usercheckDub = getCheckDub(userId)

    # 있다면 더빙 목록으로
    result = []
    if usercheckDub:
        similar_movies = find_sim_movie(
            movies_df, getSimilarity(), getDubRecord(usercheckDub)[0], 10)
        sm = similar_movies[['id', 'title', 'thumbnail']]
        for index, row in sm.iterrows():
            result.append({'id': row.id, 'title': row.title,
                           'thumbnail': row.thumbnail})
    else:  # 없다면 회원이 선택한 장르로
        userCategoryId = getCategory(userId)
        if len(userCategoryId) != 0:
            randomCategoryId = random.choice(userCategoryId)
            randomVideoTitle = random.choice(
                getVideoFindByCategory(randomCategoryId))
            similar_movies = find_sim_movie(
                movies_df, getSimilarity(), randomVideoTitle, 10)
            sm = similar_movies[['id', 'title', 'thumbnail']]
            for index, row in sm.iterrows():
                result.append({'id': row.id, 'title': row.title,
                               'thumbnail': row.thumbnail})

    return {'answer': result}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
