FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app.py .
ARG FINAL_FLAG="FLAG{ssti_read_FLAG_success}"
WORKDIR /app
RUN printf "%s\n" "$FINAL_FLAG" > /app/FLAG && chmod 444 /app/FLAG
EXPOSE 5000
CMD ["python", "app.py"]