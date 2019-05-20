let dbus = require("dbus-next");
let bus;
let adapter1;

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

const readValue = async charPath => {
  let bus = dbus.systemBus();
  let device = await bus.getProxyObject("org.bluez", charPath);
  let wblock = await device.getInterface("org.bluez.GattCharacteristic1");
  let options = new Object();

  let result = await wblock.ReadValue(options);
  return result;
};

const writeValue = async charPath => {
  let bus = dbus.systemBus();
  let device = await bus.getProxyObject("org.bluez", charPath);
  let wblock = await device.getInterface("org.bluez.GattCharacteristic1");

  return await wblock.WriteValue([73, 77, 76, 69, 71, 73, 84], new Object());
};

module.exports = {
  init,
  listAll,
  readValue,
  writeValue
};
