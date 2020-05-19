from keras.preprocessing import image
import numpy as np
import matplotlib as plt
from keras.models import load_model
import base64

def decode():
    imgdata = base64.b64decode(encoded_string)
    filename = 'some_image.jpg'  
    with open(filename, 'wb') as f:
        f.write(imgdata)
    return filename

file = decode()
img = image.load_img(file,target_size=(224,224))
img = np.asarray(img)
img = np.expand_dims(img, axis=0)

saved_model = load_model("appDermis_vgg16.h5")
output = saved_model.predict(img)

if output==[1]:
    print("Malignant")
elif output==[0]:
    print(" Benign")
else:
    print(" Undefined")