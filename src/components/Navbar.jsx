 <div className="bottom-nav">
        <button className="nav-btn active" onClick={() => navigate("/")}>
          <IoHomeOutline size={12} />
          <span></span>
        </button>
        <button className="nav-btn" onClick={() => navigate("/activity")}>
          <IoListOutline size={12} />
          <span></span>
        </button>
        <button className="nav-btn" onClick={() => navigate("/hostregister")}>
          <IoAddCircleOutline size={12} />
          <span></span>
        </button>
        <button className="nav-btn" onClick={() => navigate("/profile")}>
          <IoPersonOutline size={12} />
          <span></span>
        </button>
      </div>
    