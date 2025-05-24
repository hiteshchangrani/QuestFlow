@echo off
REM ─ Make script cd into its own folder ─
cd /d "%~dp0"

REM ─── Configuration ───
set "API=http://localhost:8000/api"

REM ─── 1) REGISTER ───
echo.
echo ====================================
echo    1) REGISTER
echo ====================================
curl --silent --location "%API%/auth/register" ^
     --header "Content-Type: application/json" ^
     --data-binary "@register.json" | jq .
echo.

REM ─── 2) LOGIN (capture to file) ───
echo ====================================
echo    2) LOGIN
echo ====================================
curl --silent --location "%API%/auth/login" ^
     --header "Content-Type: application/json" ^
     --data-raw "{\"email\":\"Hitesh@gmail.com\",\"password\":\"Hitesh\"}" > login.json

type login.json | jq .

REM ─── extract token ───
for /f "usebackq delims=" %%T in (`jq -r .token login.json`) do set "TOKEN=%%T"
if not defined TOKEN (
  echo FAILED to extract token from login.json
  pause
  exit /b 1
)
echo.
echo Token acquired: %TOKEN%
echo.

REM ─── 3) GET PROFILE ───
echo ====================================
echo    3) GET PROFILE
echo ====================================
curl --silent --location "%API%/auth/profile" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

REM ─── 4) UPLOAD IMAGE ───
echo ====================================
echo    4) UPLOAD IMAGE
echo ====================================
curl --silent --location "%API%/auth/upload-image" ^
     --header "Authorization: Bearer %TOKEN%" ^
     --form "image=@D:\Desktop\Passport-Formal(3.5cm x 3.5cm).jpg" | jq .
echo.

REM ─── 5) LIST USERS ───
echo ====================================
echo    5) LIST USERS
echo ====================================
curl --silent --location "%API%/users" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

REM ─── 6) GET USER BY ID ───
echo ====================================
echo    6) GET USER BY ID
echo ====================================
curl --silent --location "%API%/users/682f8bad4dc16b4a0cbdee71" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

REM ─── 7) CREATE TASK ───
echo ====================================
echo    7) CREATE TASK
echo ====================================
curl --silent --location "%API%/tasks" ^
     --header "Content-Type: application/json" ^
     --header "Authorization: Bearer %TOKEN%" ^
     --data-raw "{\"title\":\"Write API documentation of Quest flow\",\"description\":\"Document all endpoints for the task management app\",\"priority\":\"High\",\"dueDate\":\"2025-06-01T23:59:59.000Z\",\"assignedTo\":[\"682f8bad4dc16b4a0cbdee71\"],\"attachments\":[\"https://example.com/file1.pdf\",\"https://example.com/file2.png\"],\"todoChecklist\":[{\"text\":\"List all endpoints\",\"completed\":false},{\"text\":\"Include request/response examples\",\"completed\":false}]}" | jq .
echo.

REM ─── 8) GET TASKS ───
echo ====================================
echo    8) GET TASKS
echo ====================================
curl --silent --location "%API%/tasks" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

REM ─── 9) GET TASK BY ID ───
echo ====================================
echo    9) GET TASK BY ID
echo ====================================
curl --silent --location "%API%/tasks/68303ffd39403d1962b37440" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

REM ─── 10) UPDATE TASK ───
echo ====================================
echo    10) UPDATE TASK
echo ====================================
curl --silent --location --request PUT "%API%/tasks/68303ffd39403d1962b37440" ^
     --header "Content-Type: application/json" ^
     --header "Authorization: Bearer %TOKEN%" ^
     --data-raw "{\"title\":\"Write API documentation of QuestFlow\",\"description\":\"Document all endpoints for the task management app\",\"priority\":\"High\",\"dueDate\":\"2025-06-01T23:59:59.000Z\",\"assignedTo\":[\"682f8bad4dc16b4a0cbdee71\"],\"attachments\":[\"https://example.com/file1.pdf\",\"https://example.com/file2.png\"],\"todoChecklist\":[{\"text\":\"List all endpoints\",\"completed\":false},{\"text\":\"Include request/response examples\",\"completed\":false}]}" | jq .
echo.

REM ─── 11) DELETE TASK ───
echo ====================================
echo    11) DELETE TASK
echo ====================================
curl --silent --location --request DELETE "%API%/tasks/6830517de3d42c0043597ab6" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

REM ─── 12) UPDATE TASK STATUS ───
echo ====================================
echo    12) UPDATE TASK STATUS
echo ====================================
curl --silent --location --request PUT "%API%/tasks/683051b0e3d42c0043597acf/status" ^
     --header "Content-Type: application/json" ^
     --header "Authorization: Bearer %TOKEN%" ^
     --data-raw "{\"status\":\"Completed\"}" | jq .
echo.

REM ─── 13) UPDATE TASK CHECKLIST ───
echo ====================================
echo    13) UPDATE TASK CHECKLIST
echo ====================================
curl --silent --location --request PUT "%API%/tasks/683051b0e3d42c0043597acf/todo" ^
     --header "Content-Type: application/json" ^
     --header "Authorization: Bearer %TOKEN%" ^
     --data-raw "{\"todoChecklist\":[{\"text\":\"List all endpoints\",\"completed\":false,\"_id\":\"683056b08b3fc5b409763b10\"},{\"text\":\"Include request/response examples\",\"completed\":true,\"_id\":\"683056b08b3fc5b409763b11\"}]}" | jq .
echo.

REM ─── 14) DASHBOARD DATA ───
echo ====================================
echo    14) DASHBOARD DATA
echo ====================================
curl --silent --location "%API%/tasks/dashboard-data" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

REM ─── 15) USER DASHBOARD DATA ───
echo ====================================
echo    15) USER DASHBOARD DATA
echo ====================================
curl --silent --location "%API%/tasks/user-dashboard-data" ^
     --header "Authorization: Bearer %TOKEN%" | jq .
echo.

echo All tests completed.
pause
