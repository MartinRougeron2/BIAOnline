<script>
  import Header from "./Header.svelte";
  import Sidebar from "./Sidebar.svelte";

  import "../app.css";
</script>

<div class="app">
  <div>
    <div class="header pt-2 bg-gray-100">
      <Header></Header>
    </div>
    <div class="view h-full">
      <div class="grid grid-flow-col auto-cols-min">
        <div class="p-2">
          <Sidebar></Sidebar>
        </div>

        <main class="">
          <slot></slot>
        </main>
      </div>
    </div>
  </div>

  <footer class="bg-gray-800 text-white">contact</footer>
</div>

<style>
  .header {
    min-height: 80px;
  }
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    min-height: calc(100vh - 80px - 60px);
  }

  footer {
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: self-start;
    padding: 12px;
    min-height: 60px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
