# AI Interview Coach Setup Guide

## Camera and Microphone Access Requirements

The AI Interview Coach requires camera and microphone access to function properly. Here's how to ensure everything works correctly:

### Browser Requirements

For security reasons, camera and microphone access requires:

1. An HTTPS connection or localhost
2. User permission grants
3. A browser that supports the MediaDevices API (most modern browsers)

### Troubleshooting Camera/Microphone Issues

If you see "Camera not available" or "Microphone: Not Available":

1. **Check Browser Permissions**:

   - Click the lock/info icon in your browser's address bar
   - Ensure camera and microphone permissions are set to "Allow"
   - If denied previously, click "Reset Permissions" and refresh

2. **Use a Modern Browser**:

   - Chrome, Firefox, Edge, or Safari (latest versions)
   - Some browsers on mobile might have limited support

3. **Enable HTTPS**:

   - Camera access requires a secure context (HTTPS or localhost)
   - If testing locally outside of localhost, set up a local HTTPS certificate

4. **Restart Your Browser**:

   - Sometimes closing and reopening the browser fixes permission issues

5. **Check Device Settings**:
   - Ensure your camera/microphone isn't being used by another application
   - Check system settings to confirm the browser has permission to access media devices

### Development Notes

- `react-speech-recognition` is used for speech-to-text functionality
- The MediaDevices API (`getUserMedia`) is used for camera access
- For testing in development, use `npm run dev` which runs on localhost (a secure context)
