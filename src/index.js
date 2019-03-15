const mainEl = document.getElementById('main');
class Character {
  constructor(props) {
    this.name = props.name
    this.hp = props.hp
    this.initialHp = props.initialHp
    this.mp = props.mp
    this.initialMp = props.initialMp
    this.offensePower = props.offensePower
    this.defencePower = props.defencePower
  }

  showStatus() {
    /* 
      キャラクターの名前、hp、MPを表示する。
    */
    mainEl.innerHTML += `
      <p>ーーーーーー[ステータス]ーーーーーー</p>
      <p>キャラクター名: ${this.name}</p>
      <p>体力: ${this.hp}</p>
      <p>魔法力: ${this.mp}</p>
    `
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。 
    */
    mainEl.innerHTML += `
        <p>============================</p>
    `
    if (this.hp <= 0) {
      mainEl.innerHTML += `
        <p>${this.name}はhp0以下のため攻撃できません</p>
      `
      return
    }
    const damage = this.calcAttackDamage(defender);
    if (defender.hp <= 0) {
      mainEl.innerHTML += `
        <p>${this.name}が${defender.name}に攻撃！</p>
        <p>${defender.name}は既に死んでいます</p>
      `
      return
    } 
    defender.hp = defender.hp - damage;
    mainEl.innerHTML += `
      <p>${this.name}が${defender.name}に攻撃！</p>
      <p>${defender.name}に${damage}のダメージ</p>
    `
    if (defender.hp <= 0) {
      mainEl.innerHTML += `
        <p>${defender.name}は死にました</p>
      `
    } else {
      mainEl.innerHTML += `
        <p>${defender.name}の残りhp:${defender.hp}</p>
      `
    }
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */
    let damage =  this.offensePower - defender.defencePower;
    if (damage <= 0) {
      damage = 1;
    }
    return damage
  }
}

class Sorcerer extends Character {
  constructor(props) {
    super(props);
  }

  healSpell(target) {
    /* 
      回復魔法は3のMPを消費する。
      相手のhpを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
    mainEl.innerHTML += `
      <p>============================</p>
    `
    if (this.hp <= 0) {
      mainEl.innerHTML += `
        <p>${this.name}は死んでいます</p>
      `
      return
    }
    if (target.hp <= 0) {
      mainEl.innerHTML += `
        <p>${target.name}は死んでいます</p>
        <p>回復できません</p>
      `
      return
    }
    if (this.mp <= 0) {
      mainEl.innerHTML += `
        <p>MPが足りません</p>
      `
      return
    }
    this.mp -= 3;
    target.hp += 15;
    mainEl.innerHTML += `
      <p>${this.name}の回復魔法！</p>
      <p>${target.name}はhpが15回復</p>
      <p>${target.name}のhp:${target.hp}</p>
    `
  }

  fireSpell(target) {
    /* 
      攻撃魔法は2のMPを消費する。
      相手に10のダメージを与える。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */
    mainEl.innerHTML += `
      <p>============================</p>
    `
    if (this.hp <= 0) {
      mainEl.innerHTML += `
        <p>${this.name}は死んでいます</p>
      `
      return
    }
    if (target.hp <= 0) {
      mainEl.innerHTML += `
        <p>${target.name}は死んでいます</p>
        <p>攻撃魔法できません</p>
      `
      return
    }
    if (this.mp <= 0) {
      mainEl.innerHTML += `
        <p>MPが足りません</p>
      `
      return
    }
    this.mp -= 2;
    target.hp -= 10;
    
    mainEl.innerHTML += `
      <p>${this.name}の攻撃魔法！</p>
      <p>${target.name}に10のダメージ</p>
      <p>${target.name}のhp:${target.hp}</p>
    `
    if (target.hp <= 0) {
      mainEl.innerHTML += `
        <p>${target.name}は死にました</p>
      `
    }
  }
}



{
  const fighter = new Character({
    name: '武道家',
    hp: 10,
    mp: 0,
    offensePower: 15,
    defencePower: 10
  })
  const sorcerer = new Sorcerer({
    name: '魔法使い',
    hp: 25,
    mp: 10,
    offensePower: 8,
    defencePower: 10
  })
  const monster = new Character({
    name: 'モンスター',
    hp: 60,
    mp: 0,
    offensePower: 30,
    defencePower: 10
  })

  fighter.attack(monster);
  sorcerer.attack(monster);
  monster.attack(sorcerer);
  fighter.attack(monster);
  sorcerer.healSpell(sorcerer);
  monster.attack(fighter);
  fighter.attack(monster);
  sorcerer.fireSpell(monster);
  monster.attack(fighter);
  fighter.showStatus();
  sorcerer.showStatus();
  monster.showStatus();
}

