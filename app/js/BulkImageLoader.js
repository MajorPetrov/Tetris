class BulkImageLoader {
	constructor() {
		this.images = [];
		this.imagesLoaded = 0;
		this.isReady = false;
	}

	onReadyCallback() {
		throw new Error("BulkImageLoader.onReadyCallback was not set");
	}

	onProgressCallback() {
		let result;

		if (this.images.length > 0)
			result = this.imagesLoaded / this.images.length
		else
			result = 0;

		return result;
	}

	onImageLoaded() {
		this.loader.imagesLoaded++;

		if (this.loader.imagesLoaded == this.loader.images.length) {
			this.loader.isReady = true;
			this.loader.onReadyCallback();
		}
	};

	addImage(src, name) {
		let img = new Image();
		img.loader = this;
		this.images.push({ image: img, source: src, imgName: name });
	}

	loadImages() {
		for (let i = 0, len = this.images.length; i < len; i++) {
			this.images[i].image.src = this.images[i].source;
			this.images[i].image.onload = this.onImageLoaded;
			this.images[i].image.name = this.images[i].imgName;
		}
	}

	getImageAtIndex(index) {
		return this.images[index].image;
	}

	getImageByName(name) {
		let img;

		for (var i = 0, len = this.images.length; i < len; i++) {
			if (this.images[i].imgName == name) {
				img = this.images[i].image;
				i = len;
			}
		}

		return img;
	}
}