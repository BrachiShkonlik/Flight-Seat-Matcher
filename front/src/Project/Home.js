import React, { useState, useEffect } from 'react';
import { Navbar1 } from '../Project/Navbar1';


function Home() {
    useEffect(() => {
        document.title = 'קצת עלינו'
    }, []);

    return (
        <>
            <Navbar1></Navbar1>
            <h1 className="white" >**</h1>
            <h1 className="white" >**</h1>

            <h1>B&T Flights</h1>
            <br></br>
            <h5>
             !! flights T&B שלום וברוכים הבאים לחברת 
                <br></br>
                מעמידה את לקוחותיה בראש מעיניה ועושה כל מאמץ flights T&B
                <br></br>
                .כדי להבין את צרכיהם ולענות על ציפיותיהם מהטיסה ולתת מענה מקצועי ואמיתי  , תוך הקפדה על רמת שירות גבוהה, איכותית ואדיבה 
                <br></br>
                .מתחייבת לספק חווית טיסה מפנקת ללקוחותיה , אנו רואים ערך עליון באמינות , מצוינות והוגנות לצד הקפדה על כל הדרישות והחלומות שלך לטיסה ללא פשרות flights T&B 
                <br></br>
                ?????אז מי אנחנו בעצם

                <br></br>
                הינה חברה המארגנת ומספקת לך את טיסה חווייתית במיוחד , לפי העדפות האישית שלך flights T&B 
                <br></br>.לגבי מקום מושבך ושכניך לטיסה תוך שימת לב לתחביבך והתכנונים אותם אתה מתכנן לעשות בטיסה
                <br></br>
               

            </h5>
        </>
    )
}

export default Home;