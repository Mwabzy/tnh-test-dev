FROM python:3.13.7-slim-bookworm

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBCONF_NOWARNINGS="yes"
ENV DJANGO_NON_INTERACTIVE=true

# Install system dependencies
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Set up a non-root user
RUN useradd -U app_user && \
    install -d -m 0755 -o app_user -g app_user /app

# Set working directory
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.prod.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.prod.txt && rm -rf requirements.prod.txt

# Copy project files and set permissions
COPY --chown=app_user:app_user . .


# Ensure shell scripts are executable
RUN chmod +x /app/dockerprod/django/entrypoint.sh /app/dockerprod/django/start.sh

# Switch to non-root user
USER app_user


ENTRYPOINT ["/bin/bash", "/app/dockerprod/django/entrypoint.sh"]
CMD ["/bin/bash", "/app/dockerprod/django/start.sh", "backend"]