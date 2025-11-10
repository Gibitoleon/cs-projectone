# Use Python 3.13 slim
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system dependencies needed for Git and compiling packages
RUN apt-get update && apt-get install -y git curl build-essential && rm -rf /var/lib/apt/lists/*

# Copy requirements first (for caching)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose the port your service uses
EXPOSE 5001

# Ensure logs are printed immediately
ENV PYTHONUNBUFFERED=1

# Run your service
CMD ["python", "app.py"]
