import { ImageCandidate, VideoCandidate } from "../types";

export function merge(target, ...srcs) {
	srcs.forEach(source => {
	  Object.keys(source).forEach(key => {
		const value = source[key];
		if (Array.isArray(target[key]) && Array.isArray(value)) {
			target[key] = [...target[key], ...value];
		} else {
			target[key] = value;
		}
	  });
	});

	return target;
}

export function toImageElement(image: ImageCandidate): HTMLImageElement | HTMLImageElement[] {
  const images = image instanceof Array ? image : [image];
  const parsedImages = images.map(img => {
    let _img = img;

    if (typeof img === "string") {
      _img = new Image();
      _img.crossOrigin = "anonymous";
      _img.src = img;
    }
    return _img as HTMLImageElement;
  });

  return parsedImages.length === 1
    ? parsedImages[0]
    : parsedImages;
}

export function toVideoElement(videoCandidate: VideoCandidate): HTMLVideoElement {
  if (videoCandidate instanceof HTMLVideoElement) {
    return videoCandidate;
  } else {
    // url
    const video = document.createElement("video");
    video.setAttribute("crossorigin", "anonymous");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("playsinline", "");

    if (videoCandidate instanceof Array) {
      videoCandidate.forEach(v => appendSourceElement(video, v));
    } else {
      appendSourceElement(video, videoCandidate);
    }

    const sourceCount = video.querySelectorAll("source").length;
    if (sourceCount > 0) {
      if (video.readyState < 1) {
        video.load();
      }
    }

    return video;
  }
}

/**
 *
 * @param {Object | String} videoUrl Object or String containing Video Source URL<ko>비디오 URL 정보를 담고 있는 문자열이나 객체 {type, src}</ko>
 */
function appendSourceElement(video: HTMLVideoElement, videoUrl: string | { src: string; type: string }) {
  let videoSrc: string | undefined;
  let videoType: string | undefined;

  if (typeof videoUrl === "object") {
    videoSrc = videoUrl.src;
    videoType = videoUrl.type;
  } else if (typeof videoUrl === "string") {
    videoSrc = videoUrl;
  }

  if (!videoSrc) {
    return false;
  }

  const sourceElement = document.createElement("source");

  sourceElement.src = videoSrc;
  if (videoType) {
    sourceElement.type = videoType;
  }

  video.appendChild(sourceElement);
}
