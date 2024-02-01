import Monster from "./GameMonster";
import GridGamePosition from "./GridGamePosition";


export default class Projectile {
    x: number;
    y: number;
    target: Monster;
    speed: number;
    damage: number;
    isDestroyed = false;

    constructor(startX: number, startY: number, target: Monster, speed: number, damage: number) {
        this.x = startX;
        this.y = startY;
        this.target = target;
        this.speed = speed;
        this.damage = damage;
    }

    move(): boolean {

        if (this.isDestroyed) {
            return false;
        }

        // Calculate direction towards the target
        const dirX = this.target.position.x - this.x;
        const dirY = this.target.position.y - this.y;
        const distance = Math.sqrt(dirX * dirX + dirY * dirY);

        // Normalize direction and move towards the target
        this.x += (dirX / distance) * this.speed;
        this.y += (dirY / distance) * this.speed;

        // Check if reached the target (or close enough)
        if (Math.abs(this.x - this.target.position.x) < this.speed &&
            Math.abs(this.y - this.target.position.y) < this.speed) {
            this.hitTarget();
        }

        return true;
    }

    hitTarget() {

        // Damage the target monster
        this.target.health -= this.damage;

        // Remove the projectile (this will be handled in the game loop)
        this.isDestroyed = true;

    }

}