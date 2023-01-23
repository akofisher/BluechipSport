import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "aniuta";
import { useState } from "react";
import { API } from "services";

const useDevice = createStore({
  name: "DeviceService",
  Store: () => {
    const initialState = { deviceId: null };
    const [deviceId, setDeviceId] = useState({ ...initialState });
    AsyncStorage.setItem("deviceId", "");

    const getDeviceId = async () => {
      const device_idaaa = await AsyncStorage.getItem("deviceId");

      if (!device_idaaa) {
        API.getDeviceId().then((response) => {
          const device_id = response.data.device_id.toString();
          AsyncStorage.setItem("deviceId", device_id);
          setDeviceId(device_id);
        });
      }
    };

    return {
      deviceId,
      getDeviceId,
    };
  },
});

export default useDevice;
