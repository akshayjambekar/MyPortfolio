import speech_recognition as sr

recognizer = sr.Recognizer()





try:

  with sr.Microphone() as source:
    audio_data = recognizer.listen(source, timeout=5, phrase_time_limit=3)
    print("Say something:")
    audio_data = recognizer.listen(source)
    text = recognizer.recognize_google(audio_data)
    print("You said:", text)

except sr.UnknownValueError:

    print("Speech Recognition could not understand audio")

except sr.RequestError as e:

    print(f"Could not request results from Google Speech Recognition service; {e}")