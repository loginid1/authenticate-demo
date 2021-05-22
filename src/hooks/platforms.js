export const PLATFORMS = {
  WINDOWS: "Windows",
  APPLE: "Apple",
  ANDROID: "Android",
};

export const useFindPlatform = function () {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];
  let os = null;

  if (
    macosPlatforms.indexOf(platform) !== -1 ||
    iosPlatforms.indexOf(platform) !== -1
  ) {
    os = PLATFORMS.APPLE;
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = PLATFORMS.WINDOWS;
  } else if (/Android/.test(userAgent)) {
    os = PLATFORMS.ANDROID;
  }

  return os;
};
