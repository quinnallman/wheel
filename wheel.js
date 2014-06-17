var data = {
    games2: [
        "Yup, Sounds Good, Ill go Along with that",
        "Slow Mo Commentary",
        "Secret Wants",
        "Props",
        "Foreign Film",
        "Story Tell Die"
        ],
    games: [
        "Yup, Sounds Good, Ill go Along with that",
        "Slow Mo Commentary",
        "Secret Wants",
        "Props",
        "Foreign Film",
        "Story Tell Die",
        "Shrinking Scene",
        "Poets Corner",
        "Super Hero Funeral",
        "Fairy Tale in a Minute",
        "Stage Directions",
        "He Said She Said",
        "Scene in Rhyme",
        "Scene in Verse",
        "2 Way Dub",
        "3 Way Dub",
        "Questions Only",
        "Slide Show",
        "Movie Dub",
        "Dr Know it All ",
        "One Voice Scene",
        "Character Switch",
        "Celebrity Switch",
        "Should Have Said",
        "Forwards",
        "Backwards",
        "From the Purse",
        "Emotional Zones",
        "Tell Me More",
        "Gender Bender",
        "Translation For the Deaf",
        "Arms Action",
        "Dead Actor",
        "Death in a Scene",
        "Standrup",
        "Addictions or Superhero Funeral or Graduation",
        "Puppets",
        "Scene Three Ways",
        "Emotional Stunt Double",
        "Status Transfer",
        "Past/Present/Future",
        "Options",
        "Interior Design",
        "Don't Go, I'll Go",
        "Mood Music",
        "Type Writer",
        "Sentences",
        "Actors Nightmare",
        "Shakespeare's Nightmare",
        "No Laughs",
        "Insults and Compliments",
        "Press Conference",
        "No P",
        "Backwards Scene",
        "French Spots",
        "Movie in a Minute",
        "Dinosaur Office",
        "Vampire Library",
        "Dinner Party",
        "Scene Three Ways",
        "Pillars",
        "Genre Character",
        "Touch To Talk",
        "ABC",
        "Action Hero",
        "First Line/Last Line",
        "Entrances and Exits",
        "3 Clap Scene",
        "Mirror",
        "Emotional Roller Coaster",
        "Finger Words",
        "Inner Voice",
        "Dear Diary",
        "Look, Look Away",
        "Oscar Moment",
        "DVD Review",
        "Make a Story",
    ],
    width: 800,
    height: 800,
    angleOffset: 0,
    speed: 0,
    colours: ["orange", "red", "yellow", "aqua", "fuchsia","lime"],
    spinning: false,
    spinInterval: 0,
};

function drawWinner(canvas, winner) {
    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.font = "16pt Arial";
        var txtSize = ctx.measureText(winner);

        ctx.fillStyle = "black";
        ctx.fillRect(data.width / 2 - txtSize.width, data.width / 2 + 50, txtSize.width * 2, 100);
        ctx.fillStyle = "white";
        ctx.fillText(winner, data.width / 2 - txtSize.width / 2, data.width / 2 + 100);
    }
}

function drawWheel(canvas) {
    if(canvas.getContext) {
        var radius = data.width / 2;
        var numGames = data.games.length;
        var gameArcLength = 2*Math.PI/numGames;
        var numColours = data.colours.length;
        var ctx = canvas.getContext('2d');

        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(data.angleOffset);
        ctx.translate(-radius, -radius);

        for(var i = 0 ; i < numGames ; i++) {
            ctx.save();
            ctx.fillStyle = data.colours[i%numColours];
            ctx.translate(radius, radius);
            ctx.rotate(i * gameArcLength);
            ctx.translate(-radius, -radius);
            ctx.beginPath();
            ctx.lineTo(radius, radius);
            ctx.arc(radius, radius, radius, 0, gameArcLength, false);
            ctx.stroke();
            ctx.fill();
            ctx.restore();

            var txtSize = ctx.measureText(data.games[i]);

            ctx.save();
            ctx.fillStyle = 'black';
            ctx.font = "12pt Arial";
            ctx.textAlign = 'end';
            ctx.translate(radius, radius);
            ctx.rotate((i + 0.3) * gameArcLength);
            ctx.fillText(data.games[i], radius - 10, 10);
            ctx.restore();
        }

        ctx.restore();
        ctx.beginPath();
        // arrow on top
        //ctx.moveTo(radius - 10, 0);
        //ctx.lineTo(radius + 10, 0);
        //ctx.lineTo(radius, 10);

        // arrow on right
        ctx.moveTo(2*radius, radius - 10);
        ctx.lineTo(2*radius, radius + 10);
        ctx.lineTo(2*radius - 10, radius);
        ctx.fill();
    }
}

function spin3() {
    data.speed = 2 * Math.PI;
}

function spin2() {
    data.speed = Math.PI;
}

function spin1() {
    data.speed = Math.PI / 2;
}

function spin0() {
    data.speed = 0;
}

function update() {
    var index = 0;
    var canvas = document.getElementById('wheel');

    data.angleOffset += data.speed / 60;
    data.angleOffset %= 2 * Math.PI;

    if(data.speed <= 0) {
        data.speed = 0;
        window.clearInterval(data.spinInterval);
        data.spinning = false;

        console.debug(data.angleOffset);
        index = data.games.length - 1 - Math.floor((data.angleOffset / (2*Math.PI)) * data.games.length);
        console.debug(index);
        console.debug(data.games[index]);
    }

    drawWheel(canvas);

    if(!data.spinning) {
        drawWinner(canvas, data.games[index]);
    }
}

$(document).ready(function() {
    var canvas = document.getElementById('wheel');

    $(canvas).click(function() {
        if(!data.spinning) {
            data.spinning = true;
            data.speed = (Math.random() + 1) * 4 * Math.PI;
            data.spinInterval = window.setInterval(update, 1000/60) // every 1/60 seconds
            window.setTimeout(spin3, 1000);
            window.setTimeout(spin2, 2000);
            window.setTimeout(spin1, 3000);
            window.setTimeout(spin0, 4000);
        }
    });

    drawWheel(canvas);
});
