import bpy
import wave
import struct
import os


# Function to create a sphere mesh with shape keys for lip syncing
def create_sphere_with_shape_keys():
    # Delete default cube object
    bpy.ops.object.select_all(action='DESELECT')
    bpy.data.objects['Cube'].select_set(True)
    bpy.ops.object.delete()
    bpy.ops.mesh.primitive_uv_sphere_add(radius=1, location=(0, 0, 0))
    sphere = bpy.context.object

    start_frame = 1
    end_frame = 130

    # Set keyframes for the location property
    sphere.location.x = 0  # Initial location
    sphere.keyframe_insert(data_path="location", index=0, frame=start_frame)  # Insert keyframe for x location at start frame
    # sphere.location.x = 5  # New location
    # sphere.keyframe_insert(data_path="location", index=0, frame=end_frame)  # Insert keyframe for x location at end frame

    # Add shape keys for different lip positions
    bpy.ops.object.shape_key_add(from_mix=False)
    bpy.context.object.active_shape_key.name = "Neutral"
    bpy.ops.object.shape_key_add(from_mix=False)
    bpy.context.object.active_shape_key.name = "Closed"
    bpy.ops.object.shape_key_add(from_mix=False)
    bpy.context.object.active_shape_key.name = "Open"

    # Adjust shape key positions as needed
    sphere.data.shape_keys.key_blocks["Closed"].value = 0.0
    sphere.data.shape_keys.key_blocks["Open"].value = 1.0

  # Switch to edit mode to select mouth vertices
    bpy.ops.object.mode_set(mode='EDIT')

    # Select vertices for the mouth
    bpy.ops.mesh.select_all(action='DESELECT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.transform.vertex_random(offset=0.5)
    
    bpy.ops.object.mode_set(mode='OBJECT')

    # Add mouth shape key
    bpy.ops.object.shape_key_add(from_mix=False)
    bpy.context.object.active_shape_key.name = "Mouth"

    return sphere

# Function to animate lip syncing based on audio file
def animate_lip_sync(audio_file,scaling_factor=500):
    # Load audio file
    with wave.open(audio_file, 'rb') as wf:
        framerate = wf.getframerate()
        frames = wf.getnframes()
        duration = frames / float(framerate)

        amplitude_data = []
        while True:
            frame_data = wf.readframes(1)
            if not frame_data:
                break
            if len(frame_data) < 2:
                continue  # Skip frames with insufficient data
            amplitude = struct.unpack('<h', frame_data[:2])[0]
            amplitude_data.append(amplitude)



        bpy.context.scene.render.fps = 24
        # Calculate frame duration in seconds
        frame_duration = 1 / bpy.context.scene.render.fps
        # Animate lip syncing based on amplitude data
        print("Duration:", duration)
        print("Render FPS:", bpy.context.scene.render.fps)
        print("Frame Duration:", frame_duration)
        print("Framerate:", framerate)

        # for frame_num in range(0, int(duration * bpy.context.scene.render.fps)):
        #     print("Frame Number:", frame_num)
    # Your code inside the loop
    print(int(duration * bpy.context.scene.render.fps))
    min_amplitude = min(amplitude_data)
    max_amplitude = max(amplitude_data)
    print(min_amplitude)
    print(max_amplitude)
    for frame_num in range(0, int(duration * bpy.context.scene.render.fps)):
        if frame_num % frames >= len(amplitude_data):
            break
        bpy.context.scene.frame_set(frame_num)
        amplitude = (amplitude_data[frame_num % frames] - min_amplitude) / (max_amplitude - min_amplitude) - 1.0
        # amplitude = amplitude_data[frame_num % frames] / 32768  # Normalize amplitude
        scaled_amplitude = amplitude * (-800)  # Scale amplitude
        print("Scaled Amplitude:", scaled_amplitude)  # Print scaled amplitude
    # Adjust lip shape keys based on scaled amplitude
        bpy.data.objects['Sphere'].data.shape_keys.key_blocks["Closed"].value = scaled_amplitude
        bpy.data.objects['Sphere'].data.shape_keys.key_blocks["Open"].value = 1.0 - scaled_amplitude

        # Adjust mouth shape key
        bpy.data.objects['Sphere'].data.shape_keys.key_blocks["Closed"].keyframe_insert(data_path="value", frame=frame_num)
        bpy.data.objects['Sphere'].data.shape_keys.key_blocks["Open"].keyframe_insert(data_path="value", frame=frame_num)
        bpy.data.objects['Sphere'].data.shape_keys.key_blocks["Mouth"].value = scaled_amplitude
        bpy.data.objects['Sphere'].data.shape_keys.key_blocks["Mouth"].keyframe_insert(data_path="value", frame=frame_num)


    obj = bpy.data.objects['Sphere']

    # Get the animation data
    anim_data = obj.animation_data

    # Check if the object has animation data
    if anim_data is not None:
        # Get all animation tracks (F-Curves) associated with the object
        fcurves = anim_data.action.fcurves
        
        # Print information about each F-Curve
        for fcurve in fcurves:
            print("Data Path:", fcurve.data_path)  # Property being animated
            print("Array Index:", fcurve.array_index)  # Index for properties that use arrays (e.g., location, scale)
            print("Keyframe Points:", len(fcurve.keyframe_points))  # Number of keyframe points
            # You can access and print more information about keyframe points if needed
            print("Keyframe Points Co:", [(p.co.x, p.co.y) for p in fcurve.keyframe_points])  # Example of accessing keyframe point coordinates
            print()
    else:
        print("Object does not have animation data.")
# Function to render animation as a video file
def render_video(output_path):

        # Set frame rate


    # Set resolution
  # Lower resolution
    bpy.context.scene.render.resolution_x = 480
    bpy.context.scene.render.resolution_y = 270

    bpy.context.scene.cycles.samples = 30

    # Set render output format and dimensions
    bpy.context.scene.render.image_settings.file_format = 'FFMPEG'
    bpy.context.scene.render.ffmpeg.format = 'MPEG4'
    bpy.context.scene.render.ffmpeg.codec = 'H264'
    bpy.context.scene.render.ffmpeg.constant_rate_factor = 'HIGH'
    bpy.context.scene.render.ffmpeg.audio_codec = 'AAC'


    bpy.context.scene.frame_start = 1
    bpy.context.scene.frame_end = 130
    # Set the output file path for the video
    bpy.context.scene.render.filepath = output_path

    # Render the video
    bpy.ops.render.render(animation=True, write_still=False)

    print("Animation rendered successfully:", output_path)

# Main function
def main():
    # Create sphere with shape keys
    sphere = create_sphere_with_shape_keys()

    # Example audio file for lip syncing
    audio_file = bpy.path.abspath("//Audio.wav")

    # Animate lip syncing based on audio file
    animate_lip_sync(audio_file)

    # Render animation as a video file
    output_path = bpy.path.abspath("//output_video.mp4")
    render_video(output_path)

# Run the script
if __name__ == "__main__":
    main()
