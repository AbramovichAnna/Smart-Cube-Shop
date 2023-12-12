import axios from "axios";
import { useEffect, useState } from "react";
import "./GiftCards.css";
import GiftCard from "./GiftCard";
import { GoGift } from "react-icons/go";
import { HOST_URL } from '../../common/constants';

function GiftCards() {

    const [giftCards, setGiftCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCardValue, setSelectedCardValue] = useState(0);


    // Fetch cards on component mount
    useEffect(() => {
        console.log("GiftCards Page");
        getGiftCards();
    }, []);

    // Function to shuffle cards
    const shuffleCards = (cards) => {
        let shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        return shuffledCards;
    };

    // Function to get cards from API
    const getGiftCards = () => {
        axios
            .get(HOST_URL + "/giftcards")
            .then((response) => {
                const shuffled = shuffleCards(response.data);
                setGiftCards(shuffled);
                console.log("GiftCards fetched", response.data); // Log to ensure data is fetched
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    // Handle card click
    const handleCardClick = (card, index) => {
        // If a card is already open, do nothing
        if (isOpen) return;
        // Otherwise, open the clicked card
        setSelectedCard({ index });
        console.log("You win :", card.value, "$");
        setIsOpen(true);
        setSelectedCardValue(card.value);
    };

    return (
        <>
            <div className="container">
                <div className="centered-text">
                    <h3 className="giftcards-title"><GoGift /> Giftcards <GoGift /></h3>
                    <p className="giftcards-description">
                        Uncover Surprises – Flip a Card, Claim Your Prize!
                    </p>
                </div>
                <div className="giftcards-row">
                    {giftCards.map((card, index) => (
                        <GiftCard
                            key={index}
                            giftcard={card}
                            flipped={selectedCard?.index === index}
                            onClick={() => handleCardClick(card, index)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default GiftCards;
