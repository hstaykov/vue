<template>
  <div>
      <h1>Generate Crossword</h1>
      <table class="grid" id="table" ref="gridObject"></table>
      <el-button type="success"  v-on:click="generate">Generate</el-button>
  </div>
</template>

<script>
import firebase from "firebase";
import generateCrossword from "../utils/generate";

let gridObject;
export default {
  name: "GenerateCrossword",
  data: function() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    generate() {
      let data = generateCrossword();
      console.log(data);
      clickableGrid(6, 5, data);
      solveCrossword(data);
    }
  },
  mounted() {
    gridObject = this.$refs.gridObject;
  }
};

function solveCrossword(data) {
  for (var p = 0; p < Object.values(data).length; p++) {
    let x = Object.values(data)[p];

    if (x.align === "h") {
      let index = 0;
      for (let i = x.starts; i < x.starts + x.size; i++) {
        if (x.word[index]) document.getElementById(i).value = x.word[index];
        index++;
      }
    } else {
      let index = 0;
      for (let i = x.starts; i < x.starts + x.size * 5; i += 5) {
        if (x.word[index]) document.getElementById(i).value = x.word[index];
        index++;
      }
    }
  }
}

function clickableGrid(rows, cols, data) {
  var i = 0;

  var grid = gridObject;
  while (grid.hasChildNodes()) {
    grid.removeChild(grid.lastChild);
  }
  let descriptions = {};

  for (var x = 0; x < Object.values(data).length; x++) {
    if (descriptions[Object.values(data)[x].descr]) {
      descriptions[Object.values(data)[x].descr].push(
        Object.values(data)[x].description
      );
    } else {
      descriptions[Object.values(data)[x].descr] = [];
      descriptions[Object.values(data)[x].descr].push(
        Object.values(data)[x].description
      );
    }
  }

  // console.log(descriptions);
  grid.className = "grid";
  for (var r = 0; r < rows; ++r) {
    var tr = grid.appendChild(document.createElement("tr"));
    for (var c = 0; c < cols; ++c) {
      var cell = tr.appendChild(document.createElement("td"));
      i++;
      if (descriptions[i]) {
        // console.log(descriptions[i]);
        let letter = document.createElement("textarea");
        letter.className = "description";


        letter.value = descriptions[i].toString().replace(',', "\n\n");
        letter.disabled = true;
        cell.appendChild(letter);
      } else {
        let letter = document.createElement("input");
        letter.className = "letter";
        letter.setAttribute("maxlength", 1);
        letter.id = i;
        // letter.value=i

        letter.onkeyup = function() {
          this.value = this.value.substr(0, 3).toUpperCase();
        };
        letter.addEventListener("keydown", function(event) {
          let key = event.keyCode; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
          console.log(key);
        });

        cell.appendChild(letter);
      }
    }
  }
}

</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.grid {
  margin: 1em auto;
  border-collapse: collapse;
}
.grid td {
  cursor: pointer;
  width: 30px;
  height: 30px;
  border: 1px solid #ccc;
  text-align: center;
  font-family: sans-serif;
  font-size: 13px;
}
.grid td.clicked {
  background-color: yellow;
  font-weight: bold;
  color: red;
}
.grid>>>.letter {
  width: 100px;
  height: 100px;
  text-align: center;
  font-size: 34px;
}
.grid>>>.description {
  width: 100px;
  height: 100px;
  text-align: center;
  font-size: 14px;
  resize: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
