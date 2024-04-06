import tensorflow as tf

def encoder_block(inputs, num_filters): 
  
    # Convolution with 3x3 filter followed by ReLU activation 
    x = tf.keras.layers.Conv2D(num_filters,  
                               3,  
                               padding = 'valid')(inputs) 
    x = tf.keras.layers.Activation('relu')(x) 
      
    # Convolution with 3x3 filter followed by ReLU activation 
    x = tf.keras.layers.Conv2D(num_filters,  
                               3,  
                               padding = 'valid')(x) 
    x = tf.keras.layers.Activation('relu')(x) 
  
    # Max Pooling with 2x2 filter 
    x = tf.keras.layers.MaxPool2D(pool_size = (2, 2), 
                                  strides = 2)(x) 
      
    return x

def decoder_block(inputs, skip_features, num_filters): 
  
    # Upsampling with 2x2 filter 
    x = tf.keras.layers.Conv2DTranspose(num_filters, 
                                        (2, 2),  
                                        strides = 2,  
                                        padding = 'valid')(inputs) 
      
    # Copy and crop the skip features  
    # to match the shape of the upsampled input 
    skip_features = tf.image.resize(skip_features, 
                                    size = (x.shape[1], 
                                            x.shape[2])) 
    x = tf.keras.layers.Concatenate()([x, skip_features]) 
      
    # Convolution with 3x3 filter followed by ReLU activation 
    x = tf.keras.layers.Conv2D(num_filters, 
                               3,  
                               padding = 'valid')(x) 
    x = tf.keras.layers.Activation('relu')(x) 
  
    # Convolution with 3x3 filter followed by ReLU activation 
    x = tf.keras.layers.Conv2D(num_filters, 3, padding = 'valid')(x) 
    x = tf.keras.layers.Activation('relu')(x) 
      
    return x

def unet_model(input_shape = (256, 256, 3), num_classes = 1): 
	inputs = tf.keras.layers.Input(input_shape) 
	
	# Contracting Path 
	s1 = encoder_block(inputs, 64) 
	s2 = encoder_block(s1, 128) 
	s3 = encoder_block(s2, 256) 
	s4 = encoder_block(s3, 512) 
	
	# Bottleneck 
	b1 = tf.keras.layers.Conv2D(1024, 3, padding = 'valid')(s4) 
	b1 = tf.keras.layers.Activation('relu')(b1) 
	b1 = tf.keras.layers.Conv2D(1024, 3, padding = 'valid')(b1) 
	b1 = tf.keras.layers.Activation('relu')(b1) 
	
	# Expansive Path 
	s5 = decoder_block(b1, s4, 512) 
	s6 = decoder_block(s5, s3, 256) 
	s7 = decoder_block(s6, s2, 128) 
	s8 = decoder_block(s7, s1, 64) 
	
	# Output 
	outputs = tf.keras.layers.Conv2D(num_classes, 
									1, 
									padding = 'valid', 
									activation = 'sigmoid')(s8) 
	
	model = tf.keras.models.Model(inputs = inputs, 
								outputs = outputs, 
								name = 'U-Net') 
	return model 

if __name__ == '__main__': 
	model = unet_model(input_shape=(572, 572, 3), num_classes=2) 
	model.summary()
