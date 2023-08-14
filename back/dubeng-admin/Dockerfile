FROM continuumio/miniconda:latest

COPY . .

RUN chmod +x boot.sh

RUN conda env create -f environment.yml

RUN echo "source activate admin-environment" >> ~/.bashrc
ENV PATH /opt/conda/envs/admin-environment/bin:$PATH

RUN apt-get --allow-releaseinfo-change update
RUN apt-get install -y ffmpeg

RUN pip install -r requirements.txt

EXPOSE 5000

ENTRYPOINT ["./boot.sh"]
