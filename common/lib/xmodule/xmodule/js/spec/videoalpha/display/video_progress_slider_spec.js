(function() {
  describe('VideoProgressSliderAlpha', function() {
    var state, videoPlayer, videoProgressSlider;

    beforeEach(function() {
      window.onTouchBasedDevice = jasmine.createSpy('onTouchBasedDevice').andReturn(false);
      //TODO: modify jasmine.stubVideoPlayerAlpha by incorporating the changes below
      //jasmine.stubVideoPlayerAlpha(this);
    });

    describe('constructor', function() {
      describe('on a non-touch based device', function() {
        beforeEach(function() {
          spyOn($.fn, 'slider').andCallThrough();
          loadFixtures('videoalpha_all.html');
          state = new VideoAlpha('#example');
          videoPlayer = state.videoPlayer;
          videoProgressSlider = state.videoProgressSlider;
        });

        it('build the slider', function() {
          expect(videoProgressSlider.slider).toBe('.slider');
          expect($.fn.slider).toHaveBeenCalledWith({
            range: 'min',
            change: videoProgressSlider.onChange,
            slide: videoProgressSlider.onSlide,
            stop: videoProgressSlider.onStop
          });
        });

        it('build the seek handle', function() {
          expect(videoProgressSlider.handle).toBe('.slider .ui-slider-handle');
          expect($.fn.qtip).toHaveBeenCalledWith({
            content: "0:00",
            position: {
              my: 'bottom center',
              at: 'top center',
              container: videoProgressSlider.handle
            },
            hide: {
              delay: 700
            },
            style: {
              classes: 'ui-tooltip-slider',
              widget: true
            }
          });
        });
      });

      describe('on a touch-based device', function() {
        beforeEach(function() {
          window.onTouchBasedDevice.andReturn(true);
          spyOn($.fn, 'slider').andCallThrough();
          loadFixtures('videoalpha_all.html');
          state = new VideoAlpha('#example');
          videoPlayer = state.videoPlayer;
          videoProgressSlider = state.videoProgressSlider;
        });

        it('does not build the slider', function() {
          expect(videoProgressSlider.slider).toBeUndefined;
          //TODO: Fails
          expect($.fn.slider).not.toHaveBeenCalled();
        });
      });
    });

    describe('play', function() {
      beforeEach(function() {
        loadFixtures('videoalpha_all.html');
        state = new VideoAlpha('#example');
        videoPlayer = state.videoPlayer;
        videoProgressSlider = state.videoProgressSlider;
      });

      describe('when the slider was already built', function() {
        var spy; 

        beforeEach(function() {
          spy = spyOn(videoProgressSlider, 'buildSlider');
          spy.andCallThrough();
          videoPlayer.play();
        });

        it('does not build the slider', function() {
          expect(spy.callCount).toEqual(0);
        });
      });

      // Does it make sense to keep this test?
      describe('when the slider was not already built', function() {
        beforeEach(function() {
          spyOn($.fn, 'slider').andCallThrough();
          videoProgressSlider.slider = null;
          videoPlayer.play();
        });

        it('build the slider', function() {
          // TO DO: Fails
          expect(videoProgressSlider.slider).toBe('.slider');
          // TO DO: Fails
          expect($.fn.slider).toHaveBeenCalledWith({
            range: 'min',
            change: videoProgressSlider.onChange,
            slide: videoProgressSlider.onSlide,
            stop: videoProgressSlider.onStop
          });
        });
        
        it('build the seek handle', function() {
          expect(videoProgressSlider.handle).toBe('.ui-slider-handle');
          expect($.fn.qtip).toHaveBeenCalledWith({
            content: "0:00",
            position: {
              my: 'bottom center',
              at: 'top center',
              container: videoProgressSlider.handle
            },
            hide: {
              delay: 700
            },
            style: {
              classes: 'ui-tooltip-slider',
              widget: true
            }
          });
        });
      });
    });

    describe('updatePlayTime', function() {
      beforeEach(function() {
        loadFixtures('videoalpha_all.html');
        state = new VideoAlpha('#example');
        videoPlayer = state.videoPlayer;
        videoProgressSlider = state.videoProgressSlider;
      });

      describe('when frozen', function() {
        beforeEach(function() {
          spyOn($.fn, 'slider').andCallThrough();
          videoProgressSlider.frozen = true;
          videoProgressSlider.updatePlayTime(20, 120);
        });

        it('does not update the slider', function() {
          expect($.fn.slider).not.toHaveBeenCalled();
        });
      });
      
      describe('when not frozen', function() {
        beforeEach(function() {
          spyOn($.fn, 'slider').andCallThrough();
          videoProgressSlider.frozen = false;
          videoProgressSlider.updatePlayTime({time:20, duration:120});
        });

        it('update the max value of the slider', function() {
          expect($.fn.slider).toHaveBeenCalledWith('option', 'max', 120);
        });

        it('update current value of the slider', function() {
          expect($.fn.slider).toHaveBeenCalledWith('option', 'value', 20);
        });
      });
    });

    //TODO Fails: Problem with data-sub
    describe('onSlide', function() {
      beforeEach(function() {
        loadFixtures('videoalpha_all.html');
        state = new VideoAlpha('#example');
        videoPlayer = state.videoPlayer;
        videoProgressSlider = state.videoProgressSlider;
        spyOn($.fn, 'slider').andCallThrough();
        spyOnEvent(videoPlayer, 'onSlideSeek');
        videoProgressSlider.onSlide({}, {
          value: 20
        });
      });

      it('freeze the slider', function() {
        expect(videoProgressSlider.frozen).toBeTruthy();
      });

      it('update the tooltip', function() {
        expect($.fn.qtip).toHaveBeenCalled();
      });

      it('trigger seek event', function() {
        expect('onSlideSeek').toHaveBeenTriggeredOn(videoPlayer);
        expect(videoPlayer.currentTime).toEqual(20);
      });
    });

    describe('onChange', function() {
      beforeEach(function() {
        loadFixtures('videoalpha_all.html');
        state = new VideoAlpha('#example');
        videoPlayer = state.videoPlayer;
        videoProgressSlider = state.videoProgressSlider;
        spyOn($.fn, 'slider').andCallThrough();
        videoProgressSlider.onChange({}, {
          value: 20
        });
      });
      it('update the tooltip', function() {
        expect($.fn.qtip).toHaveBeenCalled();
      });
    });

    describe('onStop', function() {
      beforeEach(function() {
        loadFixtures('videoalpha_all.html');
        state = new VideoAlpha('#example');
        videoPlayer = state.videoPlayer;
        videoProgressSlider = state.videoProgressSlider;
        spyOnEvent(videoPlayer, 'onSlideSeek');
        videoProgressSlider.onStop({}, {
          value: 20
        });
      });

      it('freeze the slider', function() {
        expect(videoProgressSlider.frozen).toBeTruthy();
      });

      it('trigger seek event', function() {
        expect('onSlideSeek').toHaveBeenTriggeredOn(videoProgressSlider);
        expect(videoPlayer.currentTime).toEqual(20);
      });

      it('set timeout to unfreeze the slider', function() {
        expect(window.setTimeout).toHaveBeenCalledWith(jasmine.any(Function), 200);
        window.setTimeout.mostRecentCall.args[0]();
        expect(videoProgressSlider.frozen).toBeFalsy();
      });
    });
    
    describe('updateTooltip', function() {
      beforeEach(function() {
        loadFixtures('videoalpha_all.html');
        state = new VideoAlpha('#example');
        videoPlayer = state.videoPlayer;
        videoProgressSlider = state.videoProgressSlider;
        spyOn($.fn, 'slider').andCallThrough();
        videoProgressSlider.updateTooltip(90);
      });
      
      it('set the tooltip value', function() {
        expect($.fn.qtip).toHaveBeenCalledWith('option', 'content.text', '1:30');
      });
    });
  });

}).call(this);
