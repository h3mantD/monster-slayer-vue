new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameRunning: false,
    log: [],
  },

  methods: {
    startGame() {
      this.gameRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },

    attack() {
      this.playerAttack(3, 10);
      this.monsterAttack(5, 15);
    },

    specialAttack() {
      this.playerAttack(10, 20);
      this.monsterAttack(5, 15);
    },

    heal() {
      if (this.playerHealth <= 90) this.playerHealth += 10;
      else this.playerHealth = 100;
      this.log.unshift({
        isPlayer: true,
        text: "Player heals for 10",
      });
      this.monsterAttack(5, 15);
    },

    endGame() {
      this.gameRunning = false;
      this.log = [];
    },

    // game actions
    playerAttack(min, max) {
      var damage = this.calculateDamage(min, max);
      this.monsterHealth -= damage;
      this.log.unshift({
        isPlayer: true,
        text: "Player hits monster for " + damage,
      });
      if (this.checkWin(this.monsterHealth)) {
        alert("You Won!!!!");
        return;
      }
    },

    monsterAttack(min, max) {
      var damage = this.calculateDamage(min, max);
      this.playerHealth -= damage;
      this.log.unshift({
        isPlayer: false,
        text: "Player hits monster for " + damage,
      });
      if (this.checkWin(this.playerHealth)) {
        alert("You Lost!!!!");
        return;
      }
    },

    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },

    checkWin(player) {
      if (player <= 0) {
        this.gameRunning = false;
        this.log = [];
        return true;
      }

      return false;
    },
  },
});
