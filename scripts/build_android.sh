#!/usr/bin/env bash

echo "Building Android 🛠️"

npm i

cd android
./gradlew clean
./gradlew assembleRelease

cd ..

ls android/app/build/outputs/apk/release/*.apk

echo "👉 Currently in dir: $(pwd)"

export ARTIFACT_PATH="$(pwd)/android/app/build/outputs/apk/release/app-release.apk"
echo "👉 ARTIFACT_PATH path: $ARTIFACT_PATH"

eval "$(
  cat .secure_files/.env | awk '!/^\s*#/' | awk '!/^\s*$/' | while IFS='' read -r line; do
    key=$(echo "$line" | cut -d '=' -f 1)
    value=$(echo "$line" | cut -d '=' -f 2-)
    echo "export $key=\"$value\""
  done
)"

cd android
fastlane init
fastlane distribute