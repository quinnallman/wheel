var data = {
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
    width: 1000,
    height: 1000,
    angleOffset: 0,
    speed: 0,
    colours: ["orange", "red", "yellow", "aqua", "fuchsia","lime"],
    spinning: false,
    spinInterval: 0,
};

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
    }
}

function update() {
    data.angleOffset += data.speed;
    data.speed -= Math.random() * 5 * 2 * Math.PI / data.games.length;
    if(data.speed <= 0) {
        data.speed = 0;
        window.clearInterval(data.spinInterval);
        data.spinning = false;
    }

console.debug(data.speed);
    var canvas = document.getElementById('wheel');
    drawWheel(canvas);
}

$(document).ready(function() {
    var canvas = document.getElementById('wheel');

    $(canvas).click(function() {
        if(!data.spinning) {
            data.spinning = true;
            data.speed = (Math.random() + 1) * 2 * Math.PI;
            data.spinInterval = window.setInterval(update, 1000/60) // every 1/60 seconds
        }
    });

    drawWheel(canvas);
});
