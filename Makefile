a:
	open -a 'Android Studio'

lint:
	npm run lint

build_android:
	make env
	sh scripts/build_android.sh

pods:
	rm -f ios/.xcode.env.local
	pod install --repo-update --project-directory=ios

# CI ENV
env:
	sh scripts/env.sh