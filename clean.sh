rm -rf package-lock.json && rm -rf yarn.lock && rm -rf node_modules
rm -rf ios/Podfile.lock && rm -rf ios/Pods
yarn #npm i --legacy-peer-deps # or "yarn"
cd ios && pod repo update && pod update && pod install
