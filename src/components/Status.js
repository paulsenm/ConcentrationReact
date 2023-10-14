function Status(props) {
    let status = (props.matches < 10) ?
    'Matches: ' + props.matches + " Tries: " + props.tries :
    "Congratulations!  You found all 10 matches in " + props.tries + " tries!";
    return (
        <div className="pb-2" id="status">{props.status}</div>

    )
}

export default Status;