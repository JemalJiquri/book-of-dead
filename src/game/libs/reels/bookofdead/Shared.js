import * as PIXI from 'pixi.js'

class Shared  {
    static animationPart1 = null
    static animationPart2 = null

    static init() {
        Shared.animationPart1 = PIXI.Texture.from("animation_part1")
        Shared.animationPart2 = PIXI.Texture.from("animation_part2")

    }

}


export default Shared;
