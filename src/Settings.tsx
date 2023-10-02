import { components, util } from "replugged";
import { cfg } from ".";

const { TextInput, FormItem, Text, Slider, Divider } = components;

export function Settings(): React.ReactElement {
  let t: number[] = [];
  for (let i = 0; i < 1; i += 0.1) {
    t.push(i);
  }
  return (
    <>
      <FormItem>
        <Text style={{ marginBottom: "10px" }}>Volume</Text>
        <Slider
          minValue={0}
          maxValue={1}
          markers={t.map((val) => Number(val.toFixed(1)))}
          {...util.useSetting(cfg, "volume")}
        />
      </FormItem>
      <Divider></Divider>
      <FormItem>
        <Text>Exceptions</Text>
        <TextInput {...util.useSetting(cfg, "blacklistedKeys")}></TextInput>
      </FormItem>
      <Text style={{marginTop: "10px"}}>
        Seperate keys with spaces. For key codes visit{" "}
        <a target="_blank" href="https://keycode.info">https://keycode.info</a>
      </Text>
    </>
  );
}
