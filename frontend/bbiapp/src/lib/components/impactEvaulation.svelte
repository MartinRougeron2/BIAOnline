<script lang="ts">
  import type { ImpactType } from "./impactEvaulation.types";
  import { numberSecToTime } from "$lib/utils";

  export let impact: ImpactType;
  export let disable: boolean = false;

  const styleBackground = (colors: string[]) => {
    return `background: linear-gradient(to top, ${colors.join(",")})`;
  };

  $: linesMap = Array.from({ length: impact.scaleMax - impact.scaleMin + 1 });
  $: lineLength = impact.impacts.length * 60;
  $: lineDistance = 180 / (impact.scaleMax - impact.scaleMin);

  $: colorImpact = (colors: string[], value: number) => {
    if (colors[value]) {
      return colors[value];
    }
    return colors[colors.length - 1];
  };
</script>

<div>
  <div class="flex flex-col impact-view">
    <div class="flex" style="border-bottom: 1px solid black">
      {#each impact.impacts as item, index}
        <div
          class="info-brick-top text-bold"
          style="background: {colorImpact(impact.colors, item.impactSize)}"
        >
          <p class="text-center text-black">{item.impactSize}</p>
        </div>
      {/each}
    </div>
    <div class="flex" style={styleBackground(impact.colors)}>
      <div class="lines {disable ? 'disabled' : ''}">
        {#each impact.impacts as item}
          <input
            disabled={disable}
            type="range"
            class="range"
            color="white"
            min={impact.scaleMin}
            max={impact.scaleMax}
            bind:value={item.impactSize}
            style="width: 40px; height: 200px; margin: 10px;"
          />
        {/each}
      </div>
      {#each linesMap as item, index}
        <div
          style="width: {lineLength}px; height: 2px; transform: translateY({index *
            lineDistance +
            20}px);
                background: rgba(255, 255, 255, 0.4); position: absolute;
                "
          class="line"
        ></div>
      {/each}
      {#if disable}
        <div
          style="width: {lineLength +
            20}px; height: 220px; background: rgba(255, 255, 255, 0.2); transform: translateY(0px); z-index: 2; position: absolute;"
        ></div>
      {/if}
    </div>
    <div class="flex" style="border-radius: 5px;">
      {#each impact.impacts as item, index}
        <div class="info-brick-bottom">
          <p class="text-center text">{numberSecToTime(item.time)}</p>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .impact-view {
    border: 1px solid black;
    border-radius: 5px;
  }
  .range {
    writing-mode: vertical-lr;
    direction: rtl;
    vertical-align: middle;
    background: transparent;
  }

  .line {
    position: absolute;
  }

  .lines {
    z-index: 1;
  }

  .info-brick-top {
    width: 60px;
    height: 40px;
    vertical-align: middle;
    line-height: 40px;
  }

  .info-brick-top:first-child {
    border-top-left-radius: 5px;
  }
  .info-brick-top:nth-child(n) {
    border-right: 1px solid black;
  }

  .info-brick-top:last-child {
    border-right: none;
    border-top-right-radius: 5px;
  }

  .info-brick-bottom {
    width: 60px;
    height: 40px;
    vertical-align: middle;
    line-height: 40px;
  }

  .info-brick-bottom:first-child {
    border-bottom-left-radius: 5px;
  }

  .info-brick-bottom:nth-child(2n) {
    background-color: #f4f4f4;
  }

  .info-brick-bottom:nth-child(n) {
    border-right: 1px solid black;
  }

  .info-brick-bottom:last-child {
    border-right: none;
    border-bottom-right-radius: 5px;
  }

  input[type="range"] {
    -webkit-appearance: none;
    margin: 18px 0;
    width: 100%;
    writing-mode: vertical-lr;
    color: white;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ff4500;
    cursor: ns-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  .disabled input[type="range"]::-webkit-slider-thumb {
    cursor: not-allowed !important;
  }
</style>
