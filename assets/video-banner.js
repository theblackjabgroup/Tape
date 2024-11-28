  // Wrap the VideoPlayer class in an IIFE to avoid global namespace pollution
  (() => {
    // Check if the class is already defined
    if (window.VideoPlayer) return;

    class VideoPlayer {
        constructor(container) {
            try {
                // Update selectors to be scoped to this specific section
                this.container = container;
                this.videoWrappers = this.container.querySelectorAll(".video-wrapper");
                this.progressIndicators = this.container.querySelectorAll(".progress-indicator");
                this.videoContainer = this.container.querySelector(".video-container");
                this.videos = this.container.querySelectorAll("video");
                this.playButtons = this.container.querySelectorAll(".deferred-media__poster-button");

                // Validate required elements exist
                if (!this.videoContainer) {
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

        // Update progress bar with error handling
        updateProgressBar() {
            try {
                const activeWrapper = this.container.querySelector(".video-wrapper.active");
                const activeIndicator = this.container.querySelector(".progress-indicator.active");
                const activeVideo = activeWrapper?.querySelector("video");

                // Only update progress for native video elements
                if (activeVideo && activeIndicator && !activeVideo.paused) {
                    const progress = (activeVideo.currentTime / activeVideo.duration) * 100;
                    activeIndicator.style.setProperty("--progress", `${progress}%`);
                }
            } catch (error) {
                // Silently handle errors for non-video elements
                console.debug("Skipping progress update for non-video element");
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
                            
                            // Show play button for stopped videos
                            const wrapper = video.closest('.video-wrapper');
                            const playButton = wrapper.querySelector(".deferred-media__poster-button");
                            if(playButton) {
                                playButton.style.display = 'block';
                            }
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
                // Add click handlers for individual video play buttons
                this.playButtons.forEach(button => {
                    button.addEventListener("click", () => {
                        const wrapper = button.closest('.video-wrapper');
                        const video = wrapper.querySelector('video');
                        if(video) {
                            video.play().catch(error => {
                                console.error("Error playing video:", error);
                            });
                            button.style.display = 'none';
                        }
                    });
                });

                // Video-specific events
                this.videos.forEach((video) => {
                    video.addEventListener("timeupdate", () => this.updateProgressBar());
                    video.addEventListener("ended", () => {
                        try {
                            const activeIndicator = this.container.querySelector(
                                ".progress-indicator.active"
                            );
                            const wrapper = video.closest('.video-wrapper');
                            const playButton = wrapper.querySelector(".deferred-media__poster-button");
                            if(playButton) {
                                playButton.style.display = 'block';
                            }
                            if (!activeIndicator) throw new Error("No active indicator found");
                            this.resetProgressBar(activeIndicator);
                        } catch (error) {
                            console.error("Error handling video end:", error);
                        }
                    });
                    video.addEventListener("seeking", () => {
                        try {
                            const activeIndicator = this.container.querySelector(
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
                            const activeIndicator = this.container.querySelector(
                                ".progress-indicator.active"
                            );
                            const activeVideo = this.container.querySelector(
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
                                const wrapper = video.closest('.video-wrapper');
                                const playButton = wrapper.querySelector(".deferred-media__poster-button");
                                if(playButton) {
                                    playButton.style.display = 'block';
                                }
                            });

                            // Reset all progress bars
                            this.progressIndicators.forEach((ind) =>
                                this.resetProgressBar(ind)
                            );
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

    // Store the class in the window object for potential reuse
    window.VideoPlayer = VideoPlayer;

    // Update initialization code
    const initVideoPlayer = (container) => {
        try {
            new VideoPlayer(container);
        } catch (error) {
            console.error("Error creating VideoPlayer instance:", error);
        }
    };

    // Initialize all video players on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", () => {
            document.querySelectorAll('.video-container-wrapper').forEach(container => {
                initVideoPlayer(container);
            });
        });
    } else {
        // DOM is already loaded, initialize immediately
        document.querySelectorAll('.video-container-wrapper').forEach(container => {
            initVideoPlayer(container);
        });
    }

    // Initialize on Shopify section load/change
    document.addEventListener("shopify:section:load", (event) => {
        const container = event.target.querySelector(".video-container-wrapper");
        if (container) {
            initVideoPlayer(container);
        }
    });

    // Clean up when section is unloaded
    document.addEventListener("shopify:section:unload", (event) => {
        const container = event.target.querySelector(".video-container-wrapper");
        if (container) {
            // Add any cleanup code here if needed
        }
    });
})();