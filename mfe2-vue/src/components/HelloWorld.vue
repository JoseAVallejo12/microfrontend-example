<template>
  <div class="py-5">
    <div class="frame">
      <p>Nombre: {{ name }}</p>
      <p>Apellido: {{ lastName }}</p>
      <p>Numero de robot es: {{ countRobot }}</p>
    </div>
    <div class="py-3 text-center"  v-if="countRobot != 0 && path == '/vue'">
        <button class="btn btn-primary"  v-on:click="setFavorites()"  v-bind:class="{ 'btn-secondary': robotFavorites.length == 0 , 'btn-primary' :  robotFavorites.length != 0}" :disabled="robotFavorites.length == 0">Guardar robots favoritos</button>
    </div>
    <div class="container">
      <div class="cards">
        <div
          class="container-card flex-column"
          v-for="item in setRobotData"
          :key="item.robot"
        >
          <img v-if="path != '/'"
            :src="'./assets/icons/heart.svg'"
            alt="Heart"
            v-on:click="toggleFavorite(item)"
            style="z-index: 1"
          />
          <img
            class="card-image"
            v-bind:src="'https://robohash.org/' + item.robot"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Observable } from "windowed-observable";

export default {
  name: "HelloWorld",
  data: function () {
    return {
      isFavorite: false,
      robotFavorites: [],
      infoData: null,
      observableReact: new Observable("fromReact"),
      observableVue: new Observable("fromVue"),
      path: window.location.pathname,
    };
  },
  computed: {
    setRobotData: function () {
      let robots = [];
      for (let index = 0; index < this.countRobot; index++) {
        robots.push({
          isFavorite: false,
          robot: index,
        });
      }

      return robots;
    },
    countRobot: function () {
      if (this.path == "/vue") {
        this.observableReact.subscribe(
          (data) => {
            this.updatedInfo(JSON.stringify(data));
          },
          { latest: true }
        );
      } else {
        window.addEventListener("submitRobot", (event) => {
          this.updatedInfo(JSON.stringify(event.detail.data));
        });
      }

      let info = JSON.parse(this.infoData);

      if (typeof info?.amount != "undefined" && info?.amount != "") {
        return Number(info.amount);
      } else {
        return 0;
      }
    },

    name: function () {
      let info = JSON.parse(this.infoData);
     
      if (typeof info?.name != "undefined" && info?.name != "") {
        return info.name;
      } else {
        return "No hay nombre para mostrar";
      }
    },

    lastName: function () {
      let info = JSON.parse(this.infoData);

      if (typeof info?.lastName != "undefined" && info?.lastName != "") {
        return info.lastName;
      } else {
        return "No hay apellido para mostrar";
      }
    },
  },
  methods: {
    toggleFavorite: function (selectedRobot) {
      selectedRobot.isFavorite = !selectedRobot.isFavorite;

      if (selectedRobot.isFavorite) {
        let urlRobot = `https://robohash.org/${selectedRobot.robot}`;
        this.robotFavorites.push({
          urlRobot: urlRobot,
          robot: selectedRobot.robot,
        });
      } else {
        this.robotFavorites = this.robotFavorites.filter(
          (element) => element.robot != selectedRobot.robot
        );
      }
    },
    updatedInfo(value) {
      this.infoData = value;
    },
    setFavorites(){
        this.observableVue.publish(this.robotFavorites);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.frame {
  margin: 0 auto;
  width: fit-content;
  text-align: center;
}
.cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.container-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 200px;
  height: 300px;
  margin: 20px 20px;
  box-shadow: 1px 4px 8px 0px grey;
  overflow: hidden;
}
.card-image {
  width: 100%;
}
.card-image:hover {
  transform: scale(1.6);
  transition: transform 0.3s;
}
</style>
