FROM python:3.11

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install --download=/tmp -r requirements.txt
# RUN pip install --user --no-index --find-links=/tmp -r requirements.txt
COPY . .

EXPOSE 5000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0" ]