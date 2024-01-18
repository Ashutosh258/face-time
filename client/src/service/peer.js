class PeerService{
    constructor() {
        if (!this.peer) {
          this.peer = new RTCPeerConnection({
            iceServers: [
              {
                urls: [
                  "stun:stun.l.google.com:19302",
                  "stun:global.stun.twilio.com:3478",
                ],
              },
            ],
          });
        }
      }
      

      async getAnswer(offer) {
        try {
          if (this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
          }
        } catch (error) {
          console.error('Error in getAnswer:', error);
          throw error;  // Rethrow the error for better error handling
        }
      }


      async setLocalDescription(ans) {
        try {
          if (this.peer) {
            await this.peer.setRemoteDescription(new RTCSessionDescription(ans));
          }
        } catch (error) {
          console.error('Error in setLocalDescription:', error);
          throw error;  // Rethrow the error for better error handling
        }
      }
      async getOffer() {
        try {
          if (this.peer) {
            const offer = await this.peer.createOffer();
            await this.peer.setLocalDescription(new RTCSessionDescription(offer));
            return offer;
          }
        } catch (error) {
          console.error('Error in getOffer:', error);
          throw error;  // Rethrow the error for better error handling
        }
      }
    }

    export default new PeerService();