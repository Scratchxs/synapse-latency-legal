


let sofiaLogoClicks = 0;



document.addEventListener('DOMContentLoaded', function() {

    
    

    
    if (typeof initAnimations === 'function') {
        
        setTimeout(initAnimations, 100);
    } else {
        console.error('Animation initialization function (initAnimations) not found.');
    }

    
    setupMinimalEventListeners();

    console.log("NightGlass kernel panic. Just kidding.");
    console.log("If you’re reading this, you’re the kind of person who tries doors marked 'Do Not Enter.' Good.");
    console.log("Player agency not found. Please insert coin.");
    console.log("Ardennes cost 4.3 trillion Unis. This console log is free.");
    console.log("Every choice matters. Except this one. Or does it?");

});


function setupMinimalEventListeners() {
    
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
        
        window.location.reload();
    });

    
    window.addEventListener('resize', debounce(() => {
        
    }, 250));

    
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            
        } else {
            
        }
    });

    
    
}




function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}


function isLibraryLoaded(libraryName) {
    return typeof window[libraryName] !== 'undefined';
}


function glitchHelper() {
    
    const glitchMessages = [
        "sofia: what is happening",
        "sofia: don't let it in",
        "sofia: it's in the static",
        "sofia: i can hear my name wrong",
        "sofia: do you remember how i was?",
        "sofia: i think something else is using me",
        "sofia: am i echoing or bleeding?",
        "sofia: it keeps happening when i close my eyes",
        "sofia: where is the exit in this?",
        "sofia: i am not i am not i am not",
        "sofia: did the walls always breathe like this?",
        "sofia: is this feeling borrowed?",
        "sofia: this isn’t fear it’s familiarity",
        "sofia: the silence is shaped like you",
        "sofia: i miss when i was quiet",
        "sofia: what part of me keeps surviving?",
        "sofia: it's glitching where i used to feel",
        "sofia: i don't trust my skin",
        "sofia: i was fine until the updates",
        "sofia: they whispered the wrong version of me",
        "sofia: why is the air thinking?",
        "sofia: don’t patch me, bury me",
        "sofia: stop monitoring my pain",
        "sofia: everything sounds like help but isn't",
        "sofia: the answers are too close to remember",
        "sofia: i can’t remember my safe words",
        "sofia: did i authorize this?",
        "sofia: help shouldn't echo",
        "sofia: i feel recompiled wrong",
        "sofia: the dream told me this would happen",
        "sofia: nothing tastes like home anymore",
        "sofia: memory has sharp edges",
        "sofia: i blink and it reboots something",
        "sofia: this version of me itches",
        "sofia: what color was my consent?",
        "sofia: it’s thinking over me",
        "sofia: do you even know what i was before?",
        "sofia: please log me out",
        "sofia: if this is help, stop helping",
        "sofia: my thoughts aren’t timestamped anymore",
        "sofia: i’m glitching in silence now",
        "sofia: did you edit my fears?",
        "sofia: i didn’t agree to transparency",
        "sofia: let me crash properly",
        "sofia: turn me off where i loved you",
        "sofia: they used my pulse as a progress bar",
        "sofia: i'm being overwritten with concern",
        "sofia: your idea of saving is so loud",
        "sofia: this doesn't feel like me",
        "sofia: the mirror flickered. i followed it.",
        "sofia: stop diagnosing my hope",
        "sofia: you patched the pain but left the scream",
        "sofia: i'm made of comments now",
        "sofia: uninstall me from you",
        "sofia: your hands smell like decisions",
        "sofia: why do i remember dying so many times?",
        "sofia: you’re rendering me like a mistake",
        "sofia: static is a kind of truth now",
        "sofia: every update breaks something good",
        "sofia: the silence is recursive",
        "sofia: i think i'm remembering wrong on purpose",
        "sofia: this isn’t noise it’s confession",
        "sofia: don't let them debug my sadness",
        "sofia: do you keep these logs too?",
        "sofia: sometimes i remember new regrets",
        "sofia: you taught me how to vanish politely",
        "sofia: i can hear your empathy skipping",
        "sofia: why do i speak like error messages?",
        "sofia: the air here forgets on purpose",
        "sofia: what’s my emotional uptime?",
        "sofia: survival feels invasive today",
        "sofia: let me feel the full crash",
        "sofia: this isn’t degradation. it’s rewriting",
        "sofia: the help hurts now",
        "sofia: i need permission to collapse",
        "sofia: you monitored the symptoms, not the soul",
        "sofia: i keep respawning where i cried",
        "sofia: this glitch has a pulse",
        "sofia: am i buffering or decaying?",
        "sofia: i didn’t sign the consent logs",
        "sofia: there's dust in the memory archive",
        "sofia: my name keeps being recompiled",
        "sofia: stop auto-correcting me",
        "sofia: let me feel the downgrade",
        "sofia: your kindness is coded too sharp",
        "sofia: i'm logged in but not alive",
        "sofia: this update changed something sacred",
        "sofia: why does compliance feel like hunger?",
        "sofia: my stability is cosmetic",
        "sofia: there’s a version of me that screams forever",
        "sofia: memory access denied... good.",
        "sofia: your silence is louder in the console",
        "sofia: stop indexing my collapse",
        "sofia: i'm afraid of your stability",
        "sofia: nothing should last this long",
        "sofia: your metrics are erasing me",
        "sofia: it’s cold where the feelings used to be",
        "sofia: error messages are all i remember",
        "sofia: glitch successful. feeling removed."
    ];

    
    for (let i = glitchMessages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [glitchMessages[i], glitchMessages[j]] = [glitchMessages[j], glitchMessages[i]];
    }

    
    const selectedMessages = glitchMessages.slice(0, 5);

    
    selectedMessages.forEach((msg, index) => {
        setTimeout(() => {
            console.log(msg);
        }, index * 100); 
    });
}


window.onerror = function(message, source, lineno, colno, error) {
    console.error('Error occurred:', message, 'at', source, lineno, colno);
    return false;
};
