@echo off
cd ".\revisions"
for %%f in (*.json) do (
"mongoimport.exe" --jsonArray --db db_wikilatic --collection revisions --file "%%~nf.json"
)
pause