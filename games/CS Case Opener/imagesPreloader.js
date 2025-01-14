function preloadImages(images) {
    const preloadPromises = images.map(src => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
        });
    });
    return Promise.all(preloadPromises);
}

const allImages = skins.concat(knifeModels).map(item => item.image);
preloadImages(allImages).then(() => {
    console.log("All images are preloaded!");
});
