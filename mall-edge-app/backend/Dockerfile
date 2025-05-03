# Use an official Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your app
COPY . .

# Set environment variable for Flask (optional)
ENV PYTHONUNBUFFERED=1

# Run your app
CMD ["python", "run.py"]
