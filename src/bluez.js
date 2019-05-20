let dbus = require("dbus-next");
let bus;
let adapter1;
let scanningPromiseResolve;
const HCI0_PATH = "/org/bluez/hci0";

const init = async () => {
  bus = dbus.systemBus();

  const bluez = await bus.getProxyObject("org.bluez", HCI0_PATH);
  adapter1 = await bluez.getInterface("org.bluez.Adapter1");
};

const listAll = async () => {
  let bluez = await bus.getProxyObject("org.bluez", "/");
  let interface = bluez.getInterface("org.freedesktop.DBus.ObjectManager");
  return await interface.GetManagedObjects();
};

const connect = async devicePath => {
  let deviceObject = await bus.getProxyObject("org.bluez", devicePath);
  let device = await deviceObject.getInterface("org.bluez.Device1");

  await device.Connect();
};

const disconnect = async devicePath => {
  let deviceObject = await bus.getProxyObject("org.bluez", devicePath);
  let device = await deviceObject.getInterface("org.bluez.Device1");

  device.Disconnect();
};

const readValue = async charPath => {
  let deviceObject = await bus.getProxyObject("org.bluez", charPath);
  let device = await deviceObject.getInterface("org.bluez.GattCharacteristic1");
  let options = new Object();

  return await device.ReadValue(options);
};

const startDiscovery = async () =>
  new Promise(async resolve => {
    scanningPromiseResolve = resolve;
    await adapter1.StartDiscovery();
  });

const stopDiscovery = () => {
  if (scanningPromiseResolve) {
    scanningPromiseResolve();
  }

  adapter1.StopDiscovery();
};

const writeValue = async (charPath, message) => {
  let bus = dbus.systemBus();
  let deviceObject = await bus.getProxyObject("org.bluez", charPath);
  let device = await deviceObject.getInterface("org.bluez.GattCharacteristic1");

  return await device.WriteValue([...Buffer.from(message)], new Object());
};

module.exports = {
  init,
  connect,
  disconnect,
  listAll,
  readValue,
  startDiscovery,
  stopDiscovery,
  writeValue
};
