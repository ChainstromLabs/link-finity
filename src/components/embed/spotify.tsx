import React, { useEffect } from 'react';

// Extend Window interface to include onSpotifyIframeApiReady
declare global {
  interface Window {
    onSpotifyIframeApiReady: (IFrameAPI: any) => void;
  }
}

interface SpotifyEmbedProps {
  uriTrack: string;
}

const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({ uriTrack }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
        const element = document.getElementById('embed-iframe');
        const options = {
          width: '100%',
          height: '380',
          uri: uriTrack, 
        };

        IFrameAPI.createController(element, options, (EmbedController: any) => {
          document.querySelectorAll('.episode').forEach((episode) => {
            const episodeElement = episode as HTMLElement; 
            episodeElement.addEventListener('click', () => {
              EmbedController.loadUri(episodeElement.dataset.spotifyId);
            });
          });
        });
      };
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [uriTrack]);

  return <div id="embed-iframe"></div>;
};

export default SpotifyEmbed;
