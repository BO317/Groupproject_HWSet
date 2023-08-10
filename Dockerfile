FROM python:3.11-alpine       
MAINTAINER Bo    # 镜像作者信息
WORKDIR /app		   


COPY requirements.txt requirements.txt  


RUN pip install -r requirements.txt 

COPY . . 


ENV FLASK_APP back_end/server 


CMD ["flask","run","-h","0.0.0.0","-p","8000"]
