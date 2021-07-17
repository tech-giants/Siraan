DEFAULT_BUNDLE_ID=com.simtech.multivendor

# .SILENT:build
.PHONY: change ios android
change:
	@rm -rf android/app/src/main/res
	@find ./ios/csnative/Images.xcassets/AppIcon.appiconset -maxdepth 1 -type f -not -name "Contents.json" -delete
	@find ./ios/csnative/Images.xcassets/LaunchScreen.imageset -maxdepth 1 -type f -not -name "Contents.json" -delete
	@cp -R ./users/${USER}/src ./
	@cp -R ./users/${USER}/ios ./
	@cp -R ./users/${USER}/android ./