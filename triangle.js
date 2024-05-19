class Triangle {
    constructor(canvasId, scale) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scale = scale;
        this.sideA = 5;
        this.sideB = 4;
        this.sideC = 3;
    }

    draw() {
        // Generate random side lengths for the triangle
        let { sideA, sideB, sideC } = this.generateRandomSides();
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;

        // Calculate angles using cosine rule
        let { angleA, angleB, angleC } = this.calculateAngles(sideA, sideB, sideC);

        // Calculate coordinates to place sideB as the base horizontally
        let { pointAx, pointAy, pointBx, pointBy, pointCx, pointCy } = this.calculateTriangleCoordinates(sideA, sideC, angleB);

        // Adjust triangle position
        let adjustedCoordinates = this.adjustTrianglePosition(pointAx, pointAy, pointBx, pointBy, pointCx, pointCy);

        // Draw the triangle
        this.drawTriangle(adjustedCoordinates.pointAx, adjustedCoordinates.pointAy, 
                           adjustedCoordinates.pointBx, adjustedCoordinates.pointBy, 
                           adjustedCoordinates.pointCx, adjustedCoordinates.pointCy);

        // Display the angles
        //this.displayAngles(angleA, angleB, angleC, adjustedCoordinates);

        // Display the length of each side
        this.displaySideLength(sideA, sideB, sideC, adjustedCoordinates);
    }

    generateRandomSides() {
        let sideA, sideB, sideC;
        let sideMax, sideOthers;
        const range = 9;
        const paramBrance = 1.3;
        do {
            sideA = Math.floor(Math.random() * range) + 3;
            sideB = Math.floor(Math.random() * range) + 3;
            sideC = Math.floor(Math.random() * range) + 3;
            const sum = sideA + sideB + sideC;
            if (sum % 2 == 1) {
                sideA += 1;
            }
            sideMax = Math.max(sideA, sideB, sideC);
            sideOthers = sideA + sideB + sideC - sideMax;
        } while (paramBrance * sideMax > sideOthers);

        return { sideA, sideB, sideC };
    }

    calculateAngles(sideA, sideB, sideC) {
        let angleA = Math.acos((sideB**2 + sideC**2 - sideA**2) / (2 * sideB * sideC));
        let angleB = Math.acos((sideA**2 + sideC**2 - sideB**2) / (2 * sideA * sideC));
        let angleC = Math.PI - angleA - angleB;
        return { angleA, angleB, angleC };
    }

    calculateTriangleCoordinates(sideA, sideC, angleB) {

        // Calculate base
        let pointBx = 0.0;
        let pointBy = 0.0;
        let pointCx = this.scale * sideA;
        let pointCy = 0.0;

        // Calculate coordinates of vertices of the triangle
        let pointAx = this.scale *sideC * Math.cos(angleB);
        let pointAy = - this.scale *sideC * Math.sin(angleB);

        return { pointAx, pointAy, pointBx, pointBy, pointCx, pointCy };
    }

    adjustTrianglePosition(pointAx, pointAy, pointBx, pointBy, pointCx, pointCy) {
        // Calculate an average of 3 vertices
        let averageX = (pointAx + pointBx + pointCx) / 3;

        // Center of the windows
        let centerX = (this.canvas.width) / 2;

        // Calculate diff
        const marginLeft = 64;
        let diffX = marginLeft - Math.min(pointAx, pointBx, pointCx);
        const marginTop = 32;
        let diffY = marginTop - Math.min(pointAy, pointBy, pointCy);

        // Adjust positions and return the modified coordinates
        return {
            pointAx: pointAx + diffX,
            pointAy: pointAy + diffY,
            pointBx: pointBx + diffX,
            pointBy: pointBy + diffY,
            pointCx: pointCx + diffX,
            pointCy: pointCy + diffY
        };
    }

    drawTriangle(pointAx, pointAy, pointBx, pointBy, pointCx, pointCy) {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the triangle
        this.ctx.beginPath();
        this.ctx.moveTo(pointAx, pointAy);
        this.ctx.lineTo(pointBx, pointBy);
        this.ctx.lineTo(pointCx, pointCy);
        this.ctx.closePath();
        this.ctx.strokeStyle = '#000'; // Color of the lines
        this.ctx.stroke(); // Draw the triangle
    }

    displaySideLength(sideA, sideB, sideC, adjustedCoordinates) {
        let { pointAx, pointAy, pointBx, pointBy, pointCx, pointCy } = adjustedCoordinates;

        // Position adjustment for text
        let textOffsetAx = -32;
        let textOffsetAy = 32;
        let textOffsetB = 16;
        let textOffsetC = -64;

        // Display the length of each side outside the triangle
        const prevColor = this.ctx.fillStyle;
        this.ctx.fillStyle = '#FF0000'; // Color of the text (red)
        this.ctx.font = '16px Arial'; // Font size and type

        // Side A
        let textAx = (pointBx + pointCx) / 2 + textOffsetAx;
        let textAy = (pointBy + pointCy) / 2 + textOffsetAy;
        const strEdgeA = "a = " + sideA;
        this.ctx.fillText(strEdgeA, textAx, textAy);

        // Side B
        let textBx = (pointCx + pointAx) / 2 + textOffsetB;
        let textBy = (pointCy + pointAy) / 2;
        const strEdgeB = "b = " + sideB;
        this.ctx.fillText(strEdgeB, textBx, textBy);

        // Side C
        let textCx = (pointAx + pointBx) / 2 + textOffsetC;
        let textCy = (pointAy + pointBy) / 2;
        const strEdgeC = "c = " + sideC;
        this.ctx.fillText(strEdgeC, textCx, textCy);

        this.ctx.fillStyle = prevColor;
    }

    displayAngles(angleA, angleB, angleC, adjustedCoordinates) {
        let { pointAx, pointAy, pointBx, pointBy, pointCx, pointCy } = adjustedCoordinates;

        const prevColor = this.ctx.fillStyle;
        this.ctx.fillStyle = '#0000FF'; // Color of the text (blue)

        // Position adjustment for angles
        let textOffsetAngle = 20;

        // Angle A
        let angleAx = pointAx + textOffsetAngle;
        let angleAy = pointAy;
        const strAngleA = "∠A = " + (angleA * 180 / Math.PI).toFixed(2) + "°";
        this.ctx.fillText(strAngleA, angleAx, angleAy);

        // Angle B
        let angleBx = pointBx - textOffsetAngle;
        let angleBy = pointBy + textOffsetAngle;
        const strAngleB = "∠B = " + (angleB * 180 / Math.PI).toFixed(2) + "°";
        this.ctx.fillText(strAngleB, angleBx, angleBy);

        // Angle C
        let angleCx = pointCx + textOffsetAngle;
        let angleCy = pointCy + textOffsetAngle;
        const strAngleC = "∠C = " + (angleC * 180 / Math.PI).toFixed(2) + "°";
        this.ctx.fillText(strAngleC, angleCx, angleCy);

        this.ctx.fillStyle = prevColor;
    }
    // 外部から三角形の辺の長さを設定するメソッド
    setSideLengths(sideA, sideB, sideC) {
        this.sideA = sideA;
        this.sideB = sideB;
        this.sideC = sideC;
    }

    // 外部から三角形の辺の長さを取得するメソッド
    getSideLengths() {
        return {
            sideA: this.sideA,
            sideB: this.sideB,
            sideC: this.sideC
        };
    }
}

// Create an instance of the Triangle class and specify the canvas ID and scale
//let triangle = new Triangle('triangleCanvas', 21);

// Draw the triangle
//triangle.draw();
