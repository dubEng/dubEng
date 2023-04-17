오늘의 기획

## [2023-04-17]

## ERD 설계

## 기초 설계 (created / updated date 설정 안 함)

### user

- email - varchar(30) PK
- nickname - varchar(30)
- is_active - boolean
- profile_image - varchar(100)
- is_public - boolean

### user_info

- id - auto increment PK
- user_id -  varchar(30) FK
- total_rec_time - bigint
- total_days - bigint

### category

- id - auto increment
- name - varchar(20)

### user_category

- id - auto increment bigint PK
- user_id - varchar(30)
- category_id - bigint

### user_history (캘린더)

- id - auto_increment bigint
- user_id -varchar(30) FK

### mission

### video

- id - bigint auto increment
- title - varchar(100) 한국어
- path - varchar(100)
- runtime -  bigint
- thumnail - varchar(100)
- start_time - float
- end_time - float
- is_adult - boolean

### script

- id -bigint auto_increment
- start_time -float
- duration - float
- content - varchar(300)
- translate_content - varchar(300)
- vedio_id FK

### video_category

- id - auto_increment bigint
- video_id bigint FK
- category_id bigint FK

### script_bookmark

- id
- user_id
- script_id
- is_active

### video_bookmark

- id
- user_id
- video_id
- is_active

### Record

- id - bigint PK auto_increment
- video_id - bigint FK
- user_id -varchar(30) FK
- is_public - boolean
- is_active - boolean
- play_count - bigint
- created_date
- updated_date

### Record_comment

- id - bigint PK auto_increment
- record_id
- user_id
- content
- created_date
- updated_date

### record_like

- id - bigint PK auto_increment
- record_id - bigint
- user_id - varchar(30) FK
- is_active
- created_date
- updated_date
