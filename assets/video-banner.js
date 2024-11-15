class VideoPlayer {
    constructor() {
        try {
            // Cache DOM elements with error checking
            this.videoWrappers = document.querySelectorAll(".video-wrapper");
            this.progressIndicators = document.querySelectorAll(
                ".progress-indicator"
            );
            this.videoContainer = document.querySelector(".video-container");
            this.playButton = document.querySelector(".play-button-icon");
            this.pauseButton = document.querySelector(".pause-button-icon");
            this.videos = document.querySelectorAll("video");

            // Validate required elements exist
            if (!this.videoContainer || !this.playButton || !this.pauseButton) {
                throw new Error("Required DOM elements not found");
            }

            // Initialize state
            this.scrollTimeout = null;

            // Set initial active state if elements exist
            if (this.videoWrappers.length > 0 && this.progressIndicators.length > 0) {
                this.videoWrappers[0].classList.add("active");
                this.progressIndicators[0].classList.add("active");
            } else {
                console.warn("No video wrappers or progress indicators found");
            }

            this.initializeObservers();
            this.initializeEventListeners();
            this.initializeStyles();
        } catch (error) {
            console.error("Error initializing VideoPlayer:", error);
        }
    }

    // Reset progress bar to 0% with error handling
    resetProgressBar(indicator) {
        try {
            if (!indicator) throw new Error("Invalid progress indicator");
            indicator.style.setProperty("--progress", "0%");
            document.documentElement.style.setProperty("--progress-width", "0%");
        } catch (error) {
            console.error("Error resetting progress bar:", error);
        }
    }

    // Initialize Intersection Observers for video visibility and switching
    initializeObservers() {
        try {
            // Observer configuration for video visibility and progress
            const observerOptions = {
                root: this.videoContainer,
                threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0 to 1 in 0.01 steps
                rootMargin: "0px",
            };

            // Observer for video visibility and progress indicator width
            this.visibilityObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    try {
                        const targetIndex = Array.from(this.videoWrappers).indexOf(
                            entry.target
                        );
                        const currentIndicator = this.progressIndicators[targetIndex];

                        if (!currentIndicator)
                            throw new Error("Progress indicator not found");

                        // Smooth opacity transition based on visibility
                        entry.target.style.opacity = Math.pow(entry.intersectionRatio, 0.5);

                        if (entry.intersectionRatio > 0.5) {
                            this.setActiveElements(entry.target, currentIndicator);
                        }

                        this.updateIndicatorWidth(entry, currentIndicator);
                    } catch (error) {
                        console.error("Error in visibility observer:", error);
                    }
                });
            }, observerOptions);

            // Observer for handling video switching
            this.switchObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        try {
                            if (entry.intersectionRatio > 0.5) {
                                this.stopOtherVideos(entry.target);
                            }
                        } catch (error) {
                            console.error("Error in switch observer:", error);
                        }
                    });
                },
                {
                    root: this.videoContainer,
                    threshold: 0.5,
                }
            );

            // Start observing all video wrappers
            this.videoWrappers.forEach((wrapper) => {
                this.visibilityObserver.observe(wrapper);
                this.switchObserver.observe(wrapper);
            });
        } catch (error) {
            console.error("Error initializing observers:", error);
        }
    }

    // Set active elements and reset others with error handling
    setActiveElements(activeWrapper, activeIndicator) {
        try {
            if (!activeWrapper || !activeIndicator) {
                throw new Error("Invalid active elements");
            }

            this.videoWrappers.forEach((wrapper) =>
                wrapper.classList.remove("active")
            );
            this.progressIndicators.forEach((indicator) => {
                indicator.classList.remove("active");
                this.resetProgressBar(indicator);
            });

            activeWrapper.classList.add("active");
            activeIndicator.classList.add("active");
        } catch (error) {
            console.error("Error setting active elements:", error);
        }
    }

    // Calculate and update indicator width with error handling
    updateIndicatorWidth(entry, indicator) {
        try {
            if (!entry || !indicator) throw new Error("Invalid parameters");

            const baseWidth = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue(
                    "--dot-size"
                )
            );
            if (isNaN(baseWidth)) throw new Error("Invalid base width");

            const maxWidth = baseWidth * 10;
            const width =
                entry.intersectionRatio > 0.1
                    ? baseWidth + (maxWidth - baseWidth) * entry.intersectionRatio
                    : baseWidth;

            indicator.style.width = `${width}px`;
        } catch (error) {
            console.error("Error updating indicator width:", error);
        }
    }

    // Toggle play/pause state with error handling
    togglePlayPause() {
        try {
            const activeVideo = document.querySelector(".video-wrapper.active video");
            if (!activeVideo) throw new Error("No active video found");

            if (activeVideo.paused) {
                // Attempt to play video with error handling
                activeVideo.play().catch((error) => {
                    console.error("Error playing video:", error);
                });
                this.playButton.classList.add("hidden");
                this.pauseButton.classList.add("visible");
            } else {
                activeVideo.pause();
                this.playButton.classList.remove("hidden");
                this.pauseButton.classList.remove("visible");
            }
        } catch (error) {
            console.error("Error toggling play/pause:", error);
        }
    }

    // Update progress bar with error handling
    updateProgressBar() {
        try {
            const activeVideo = document.querySelector(".video-wrapper.active video");
            const activeIndicator = document.querySelector(
                ".progress-indicator.active"
            );

            if (!activeVideo || !activeIndicator)
                throw new Error("Required elements not found");

            if (!activeVideo.paused) {
                if (isNaN(activeVideo.duration))
                    throw new Error("Invalid video duration");
                const progress = (activeVideo.currentTime / activeVideo.duration) * 100;
                activeIndicator.style.setProperty("--progress", `${progress}%`);
            }
        } catch (error) {
            console.error("Error updating progress bar:", error);
        }
    }

    // Update play/pause button states with error handling
    updatePlayPauseButton(video) {
        try {
            if (!video) throw new Error("Invalid video element");

            if (video.paused) {
                this.playButton.classList.remove("hidden");
                this.pauseButton.classList.remove("visible");
            } else {
                this.playButton.classList.add("hidden");
                this.pauseButton.classList.add("visible");
            }
        } catch (error) {
            console.error("Error updating play/pause button:", error);
        }
    }

    // Stop other videos with error handling
    stopOtherVideos(activeWrapper) {
        try {
            if (!activeWrapper) throw new Error("Invalid active wrapper");

            this.videos.forEach((video, index) => {
                try {
                    if (video !== activeWrapper.querySelector("video")) {
                        video.pause();
                        video.currentTime = 0;
                        this.resetProgressBar(this.progressIndicators[index]);
                    }
                } catch (error) {
                    console.error(`Error stopping video ${index}:`, error);
                }
            });
        } catch (error) {
            console.error("Error stopping other videos:", error);
        }
    }

    // Initialize event listeners with error handling
    initializeEventListeners() {
        try {
            // Play/Pause button events
            this.playButton.addEventListener("click", () => this.togglePlayPause());
            this.pauseButton.addEventListener("click", () => this.togglePlayPause());

            // Video-specific events
            this.videos.forEach((video) => {
                video.addEventListener("timeupdate", () => this.updateProgressBar());
                video.addEventListener("play", () => this.updatePlayPauseButton(video));
                video.addEventListener("pause", () =>
                    this.updatePlayPauseButton(video)
                );
                video.addEventListener("ended", () => {
                    try {
                        this.playButton.classList.remove("hidden");
                        this.pauseButton.classList.remove("visible");
                        const activeIndicator = document.querySelector(
                            ".progress-indicator.active"
                        );
                        if (!activeIndicator) throw new Error("No active indicator found");
                        this.resetProgressBar(activeIndicator);
                    } catch (error) {
                        console.error("Error handling video end:", error);
                    }
                });
                video.addEventListener("seeking", () => {
                    try {
                        const activeIndicator = document.querySelector(
                            ".progress-indicator.active"
                        );
                        if (!activeIndicator) throw new Error("No active indicator found");
                        this.resetProgressBar(activeIndicator);
                    } catch (error) {
                        console.error("Error handling video seeking:", error);
                    }
                });
            });

            // Scroll event for progress bar reset
            this.videoContainer.addEventListener("scroll", () => {
                try {
                    clearTimeout(this.scrollTimeout);
                    this.progressIndicators.forEach((indicator) =>
                        this.resetProgressBar(indicator)
                    );

                    this.scrollTimeout = setTimeout(() => {
                        const activeIndicator = document.querySelector(
                            ".progress-indicator.active"
                        );
                        const activeVideo = document.querySelector(
                            ".video-wrapper.active video"
                        );
                        if (!activeIndicator || !activeVideo)
                            throw new Error("Required elements not found");

                        const progress =
                            (activeVideo.currentTime / activeVideo.duration) * 100;
                        activeIndicator.style.setProperty("--progress", `${progress}%`);
                        document.documentElement.style.setProperty(
                            "--progress-width",
                            `${progress}%`
                        );
                    }, 150);
                } catch (error) {
                    console.error("Error handling scroll:", error);
                }
            });

            // Add click handlers for progress indicators
            this.progressIndicators.forEach((indicator, index) => {
                indicator.addEventListener("click", () => {
                    try {
                        // Calculate scroll position
                        const targetWrapper = this.videoWrappers[index];
                        if (!targetWrapper)
                            throw new Error("Target video wrapper not found");

                        // Smooth scroll to the clicked video
                        this.videoContainer.scrollTo({
                            left: targetWrapper.offsetLeft,
                            behavior: "smooth",
                        });

                        // Update active states
                        this.setActiveElements(targetWrapper, indicator);

                        // Stop all videos
                        this.videos.forEach((video) => {
                            video.pause();
                            video.currentTime = 0;
                        });

                        // Reset all progress bars
                        this.progressIndicators.forEach((ind) =>
                            this.resetProgressBar(ind)
                        );

                        // Update play/pause button states
                        this.playButton.classList.remove("hidden");
                        this.pauseButton.classList.remove("visible");
                    } catch (error) {
                        console.error("Error handling indicator click:", error);
                    }
                });
            });
        } catch (error) {
            console.error("Error initializing event listeners:", error);
        }
    }

    // Initialize required styles with error handling
    initializeStyles() {
        try {
            const style = document.createElement("style");
            style.textContent = `
                .progress-indicator.active::after {
                    width: var(--progress-width, 0%);
                }
            `;
            document.head.appendChild(style);
        } catch (error) {
            console.error("Error initializing styles:", error);
        }
    }
}

// Replace the DOMContentLoaded initialization with this:
const initVideoPlayer = () => {
    try {
        new VideoPlayer();
    } catch (error) {
        console.error("Error creating VideoPlayer instance:", error);
    }
};

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", initVideoPlayer);

// Initialize on Shopify section load/change
document.addEventListener("shopify:section:load", (event) => {
    if (
        event.target.contains(document.querySelector(".video-container-wrapper"))
    ) {
        initVideoPlayer();
    }
});
