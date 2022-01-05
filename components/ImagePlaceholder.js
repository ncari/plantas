import React, { useState } from "react";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

function ImagePlaceholder(props) {
  const [imageVisible, setImageVisible] = useState(false);
  return (
    <ShimmerPlaceholder
      height={200}
      style={props.style ?? null}
      visible={imageVisible}
    >
      <Image onLoad={() => setImageVisible(true)} {...props} />
    </ShimmerPlaceholder>
  );
}

export default ImagePlaceholder;
