from pathlib import Path
import environ
import os
from datetime import timedelta
import dj_database_url

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
env_file = os.getenv("ENV_FILE", ".env")

# Initialize environ
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, env_file))

SECRET_KEY = env("SECRET_KEY", default=None)

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG", default=True)

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

CSRF_TRUSTED_ORIGINS = env.list("DJANGO_CSRF_TRUSTED_ORIGINS", default=[])

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = env.list("CORS_ALLOWED_ORIGINS", default=[])


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework', 
    'corsheaders',
    'rest_framework.authtoken',
    'rest_framework_simplejwt',
    'authentication',
    'clinics',
    'generalinfo',
]

MIDDLEWARE = [
     'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    
]


ROOT_URLCONF = 'web.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'web.wsgi.application'


LOCAL_DEV = env.bool("LOCAL_DEV", default=True)
if LOCAL_DEV and DEBUG:
    DATABASES = {
    "default": dj_database_url.parse(os.environ.get("DATABASE_URL")),
}
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env("POSTGRES_DATABASE", default=None),
            "USER": env("POSTGRES_USER", default=None),
            "PASSWORD": env("POSTGRES_PASSWORD", default=None),
            "HOST": env("POSTGRES_HOST", default=None),
            "PORT": env.int("POSTGRES_PORT", default=None),
        },
    }

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
      'rest_framework.permissions.IsAuthenticated'
    ],
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
# True in local by default, false in live by default.
USE_ABSOLUTE_MEDIA_URLS = env.bool("USE_ABSOLUTE_MEDIA_URLS", default=LOCAL_DEV)

# Clinical service auto-translation
AUTO_TRANSLATE_ON_SAVE = env.bool("AUTO_TRANSLATE_ON_SAVE", default=False)
AUTO_TRANSLATE_PROVIDER_URL = env(
    "AUTO_TRANSLATE_PROVIDER_URL",
    default="https://translate.googleapis.com/translate_a/single",
)
AUTO_TRANSLATE_TIMEOUT_SECONDS = env.float(
    "AUTO_TRANSLATE_TIMEOUT_SECONDS",
    default=8.0,
)
AUTO_TRANSLATE_CACHE_TTL_SECONDS = env.int(
    "AUTO_TRANSLATE_CACHE_TTL_SECONDS",
    default=60 * 60 * 24,
)
AUTO_TRANSLATE_RATE_LIMIT_WINDOW_SECONDS = env.int(
    "AUTO_TRANSLATE_RATE_LIMIT_WINDOW_SECONDS",
    default=60,
)
AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS = env.int(
    "AUTO_TRANSLATE_RATE_LIMIT_MAX_CALLS",
    default=200,
)

# USE_X_FORWARDED_HOST = True
# SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "http")
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = "authentication.CustomUser"

# Email Settings
EMAIL_BACKEND=env("EMAIL_BACKEND", default=None)
EMAIL_HOST = env("EMAIL_HOST", default=None)
EMAIL_PORT = env.int("EMAIL_PORT", default=None)
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
EMAIL_USE_SSL = env.bool("EMAIL_USE_SSL", default=False)

# Microsoft credentials
MICROSOFT_TENANT_ID = env("MICROSOFT_TENANT_ID", default=None)
MICROSOFT_CLIENT_ID = env("MICROSOFT_CLIENT_ID", default=None)
MICROSOFT_CLIENT_SECRET = env("MICROSOFT_CLIENT_SECRET", default=None)
MICROSOFT_EMAIL_SENDER = env("MICROSOFT_EMAIL_SENDER", default=None)

CSRF_TRUSTRED_ORIGINS = env.list("CSRF_TRUSTED_ORIGINS_DEPLOY")
