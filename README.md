### Config reference
```dotenv
# 서버 포트
PORT=3000
# 세션 시크릿(랜덤 값 사용)
SESSION_SECRET=
# 트위치 클라이언트 ID
OAUTH2_CLIENT_ID=
# 트위치 클라이언트 시크릿
OAUTH2_CLIENT_SECRET=
# oauth2 리다이렉트 URI(/auth/login)
OAUTH2_CLIENT_CALLBACK=domain/auth/login

# postgres 데이터베이스 URL
DATABASE_URL="postgresql://postgres:sans@localhost:5432/postgres?schema=public"
```
