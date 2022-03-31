import math

keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="


def encodeInp(input):
    output = ''
    i = 0
    while True:
        char1 = ord(input[i])
        i += 1
        char2 = ord(input[i])
        i += 1
        char3 = ord(input[i])
        i += 1
        enc1 = char1 >> 2
        enc2 = ((char1 & 3) << 4) | (char2 >> 4)
        enc3 = ((char2 & 15) << 2) | (char3 >> 6)
        enc4 = char3 & 63
        if math.isnan(char2):
            enc3 = 64
            enc4 = 64
        elif math.isnan(char3):
            enc4 = 64
        output = output + keyStr[enc1] + keyStr[enc2] + keyStr[enc3] + keyStr[enc4]
        if i >= len(input):
            break
    return output
