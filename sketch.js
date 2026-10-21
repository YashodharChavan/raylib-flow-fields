const r = require("raylib");
const { Noise } = require("noisejs");

function setup() {
    const world = {
        windowWidth: 1000,
        windowHeight: 800,
        distance: 50,
    };

    world.noise = new Noise(Math.random());
    world.points = initializePoints(world);

    r.SetTraceLogLevel(r.LOG_NONE);
    r.InitWindow(world.windowWidth, world.windowHeight, "FLOW FIELDS");
    r.SetTargetFPS(10);

    return world;
}

function initializePoints(world) {
    const points = [];
    const rowLimit = Math.ceil(world.windowHeight / world.distance);
    const colLimit = Math.ceil(world.windowWidth / world.distance);

    for (let i = 0; i < colLimit; i++) {
        const point = [];
        for (let j = 0; j < rowLimit; j++) {
            point.push({
                x: Math.random() * world.windowWidth,
                y: Math.random() * world.windowHeight,
            });
        }
        points.push(point);
    }

    return points;
}

function plotPointsEvenly(world) {
    const rowLimit = Math.ceil(world.windowHeight / world.distance);
    const colLimit = Math.ceil(world.windowWidth / world.distance);

    for (let col = 0; col < colLimit; col++) {
        for (let row = 0; row < rowLimit; row++) {
            const point = world.points[col][row];

            const pointX = point.x;
            const pointY = point.y;

            const scale = 0.005;

            const noiseValue = world.noise.perlin2(
                point.x * scale,
                point.y * scale,
            );

            const angle = noiseValue * 2 * Math.PI;

            r.DrawCircle(pointX, pointY, 2, r.ColorAlpha(r.WHITE, 0.75));
            point.x += Math.cos(angle);
            point.y += Math.sin(angle);
        }
    }
}

function isRunning() {
    return !r.WindowShouldClose();
}

function draw(world) {
    r.BeginDrawing();

    plotPointsEvenly(world);

    r.EndDrawing();
}

function update(world) {}

function tearDown() {
    r.CloseWindow();
}

module.exports = {
    setup,
    isRunning,
    draw,
    update,
    tearDown,
};
